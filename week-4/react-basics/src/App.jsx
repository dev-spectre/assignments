/* eslint-disable react/prop-types */
import { useState } from "react";
import "./App.css";

let globalId = 1;

function App() {
  const [todos, setTodo] = useState([]);

  return (
    <>
      <input type="text" id="title" placeholder="Todo title"></input> <br />
      <br />
      <input type="text" id="description" placeholder="Todo description"></input> <br />
      <br />
      <button
        onClick={() => {
          const title = document.getElementById("title").value;
          const description = document.getElementById("description").value;
          setTodo([...todos, { title, description, id: ++globalId }]);
        }}>
        Add todo
      </button>
      <br /> <br />
      <div className="todos">
        {todos.map((todo) => (
          <Todo id={todo.id} title={todo.title} description={todo.description} todos={todos} setTodo={setTodo} />
        ))}
      </div>
    </>
  );
}

function Todo({ todos, setTodo, title, description, id }) {
  return (
    <div id={id}>
      <h2>{title}</h2>
      <p>{description}</p>
      <button
        onClick={(event) => {
          const title = prompt("Enter new title");
          const description = prompt("Enter new description");

          const id = +event.target.parentElement.id;
          const index = todos.findIndex((todo) => id === todo.id);
          const todo = { ...todos.at(index) };
          todo.title = title ? title : todo.title;
          todo.description = description ? description : todo.description;

          setTodo(todos.with(index, todo));
        }}>
        Edit
      </button>
      <button
        onClick={(event) => {
          const id = +event.target.parentElement.id;
          const index = todos.findIndex((todo) => id === todo.id);
          setTodo([...todos.slice(0, index), ...todos.slice(index + 1)]);
        }}>
        Delete
      </button>
      <button
        onClick={(event) => {
          event.target.innerText = "Done";
        }}>
        Mark as done
      </button>
    </div>
  );
}

export default App;
