import { client } from "..";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(username: string, password: string, name: string) {
  const values = [username, password, name];
  const query = "INSERT INTO users (username, password, name) VALUES ($1, $2, $3) RETURNING username, password, name";
  try {
    // await client.connect();
    const result = await client.query(query, values);
    return {
      username: result.rows.at(0).username,
      password: result.rows.at(0).password,
      name: result.rows.at(0).name,
    };
  } catch (err) {
    console.error(err);
  } finally {
    // client.end();
  }
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
  const values = [userId];
  const query = "SELECT id, username, password, name FROM users WHERE id = $1";
  try {
    // await client.connect();
    const result = await client.query(query, values);

    if (result.rows.length > 0) {
      return result.rows.at(0);
    } else {
      return "User not found";
    }
  } catch (err) {
    console.error(err);
  } finally {
    // client.end();
  }
}
