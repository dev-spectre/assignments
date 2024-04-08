import crypto from "node:crypto";

const NOISE_LENGTH = 78;
const SALT_LENGTH = 104;
const PBKDF2_ITERATION = 1200;
const PBKDF2_LENGTH = 150;
const DIGEST = "sha512";

export function hashPassword(password: string, salt?: string): string {
  if (salt && salt.length !== SALT_LENGTH) return "";
  const randomSalt: string = salt || crypto.randomBytes(NOISE_LENGTH).toString("base64");
  const hashPassword: string = crypto.pbkdf2Sync(password, randomSalt, PBKDF2_ITERATION, PBKDF2_LENGTH, DIGEST).toString("base64");
  const firstHalfOfSalt = randomSalt.slice(0, SALT_LENGTH / 2);
  const secondHalfOfSalt = randomSalt.slice(SALT_LENGTH / 2, SALT_LENGTH);
  return `${secondHalfOfSalt}${hashPassword}${firstHalfOfSalt}`;
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const hashedPasswordLength = hashedPassword.length - SALT_LENGTH;
  const salt = `${hashedPassword.slice(hashedPasswordLength + SALT_LENGTH / 2, hashedPassword.length)}${hashedPassword.slice(0, SALT_LENGTH / 2)}`;
  return (await hashPassword(password, salt)) === hashedPassword;
}
