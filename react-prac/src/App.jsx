import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Todo } from "./components/todo";
import "./App.css";

function App() {
  const [sum, setSum] = useState(0);
  const [count, setCount] = useState(0);

  return (
    <>
      <input
        onChange={function (e) {
          const num = Number(e.target.value);
          if (!num) return;
          let newSum = 0;
          for (let i = 1; i <= num; i++) {
            newSum += i;
          }
          console.log(sum, "RENDER")
          setSum(newSum);
        }}
      />
      <p>Sum is {sum}</p>
      <button
        onClick={function () {
          setCount((count) => count + 1);
        }}>
        Count ({count})
      </button>
    </>
  );
}

export default App;
