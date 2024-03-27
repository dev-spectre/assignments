import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertUser(firstName: string, lastName: string, email: string, password: string) {
  try {
    const result = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });

    console.log("User created");
    console.log(result);
  } catch (err) {
    console.error(err);
  }
}

interface userInfoToUpdate {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

async function updateUser(id: number, newParams: userInfoToUpdate) {
  try {
    const result = await prisma.user.update({
      data: newParams,
      where: { id },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        id: true,
      },
    });

    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

async function main() {
  await insertUser("Carlos", "Sainz", "carlos.sainz@gmail.com", "hashedpass");
  await updateUser(4, { email: "smmoooothoperaaator@gmail.com" });
}

main();
