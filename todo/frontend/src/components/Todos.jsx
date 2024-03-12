async function markAsCompleted(event) {
  const status = event.target.innerText;
  if (status != "Mark as done") return;
  event.target.innerText = "completed";
  const todoId = event.target.parentElement.dataset.id;
  const res = await fetch("http://localhost:3000/completed", {
    method: "PUT",
    body: JSON.stringify({ id: todoId }),
    headers: { "content-type": "application/json" },
  });
  const data = await res.json();
  if (data.message !== "Todo updated") {
    event.target.innerText = "Mark as done";
  }
}

export function Todos({ todos }) {
  const todoList = todos.map((todo) => (
    <div data-id={todo._id} className="todo" key={todo._id}>
      <h2>{todo.title}</h2>
      <p>{todo.description}</p>
      <button onClick={markAsCompleted}>{todo.completed ? "Completed" : "Mark as done"}</button>
    </div>
  ));
  return <>{todoList}</>;
}
