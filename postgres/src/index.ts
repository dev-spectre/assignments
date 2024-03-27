import { Client, QueryResult } from "pg";

const CLIENT_CONFIG = {
  host: "localhost",
  port: 5432,
  database: "postgres",
  user: "postgres",
  password: "password",
};

async function createUsersDatabase(): Promise<any> {
  const client: Client = new Client(CLIENT_CONFIG);

  try {
    await client.connect();
    await client.query(
      `CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );`
    );
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

async function insertIntoUsers(username: string, email: string, password: string) {
  const client: Client = new Client(CLIENT_CONFIG);

  const values: string[] = [username, email, password];
  const query = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";

  try {
    await client.connect();
    const result: QueryResult<any> = await client.query(query, values);
    console.log(`User inserted, new row count: ${result.rowCount}`);
  } catch (err) {
    console.error(err);
  } finally {
    client.end();
  }
}

async function fetchUser(email: string) {
  const client: Client = new Client(CLIENT_CONFIG);

  const values = [email];
  const query = `
    SELECT id, username, email, created_at FROM users
    WHERE email = $1
    `;

  try {
    await client.connect();
    const result = await client.query(query, values);
    if (result.rows.length > 0) {
      console.log(result.rows.at(0));
    } else {
      console.log("User doesn't exists");
    }
  } catch (err) {
    console.error(err);
  } finally {
    client.end();
  }
}

async function dropUsers() {
  const client = new Client(CLIENT_CONFIG);
  try {
    await client.connect();
    await client.query("DROP TABLE users");
  } catch (err) {
    console.error(err);
  } finally {
    client.end();
  }
}

async function main() {
  await dropUsers();
  await createUsersDatabase();
  await insertIntoUsers("Abhishek Dallas", "abhishekdallasalpy@gmail.com", "hashedpassword");
  await fetchUser("abhishekdallasalpy@gmail.com");
}

main();
