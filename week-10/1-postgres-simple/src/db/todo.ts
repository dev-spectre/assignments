import { client } from "..";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(userId: number, title: string, description: string) {
  const values = [userId, title, description];
  const query = "INSERT INTO todos (user_id, title, description) VALUES ($1, $2, $3) RETURNING title, description, id, done";
  try {
    // await client.connect();
    const result = await client.query(query, values);
    return result.rows.at(0);
  } catch (err) {
    console.error(err);
  }
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
  const values = [todoId];
  const query = "UPDATE todos SET done = true WHERE id = $1 RETURNING title, description, done, id";
  // try {
  // await client.connect();
  const result = await client.query(query, values);
  if (result.rows.length === 0) return {};
  return result.rows.at(0);
  // } catch (err) {
  // console.error(err);
  // }
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
  const values = [userId];
  const query = "SELECT * FROM todos WHERE user_id = $1";
  // try {
  // await client.connect();
  const result = await client.query(query, values);
  console.log(result.rows);
  return result.rows;
  // } catch (err) {
  // console.error(err);
  // } finally {
  // client.end();
  // }
}
