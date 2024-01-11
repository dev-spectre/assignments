import React, { useState } from "react";
import "./App.css";

const Header = React.memo(function ({ title }) {
  return <div>Hello my name is {title}</div>;
});

function App() {
  const [title, setTitle] = useState("spectre");

  return (
    <>
      <button onClick={() => setTitle(Math.random())}>Change title</button>
      <Header title={title} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Header title="Hello, World" />
    </>
  );
}

export default App;
