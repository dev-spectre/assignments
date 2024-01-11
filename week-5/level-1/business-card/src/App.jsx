import { useState } from "react";
import Card from "./components/card";
import "./App.css";

function App() {
  return (
    <>
      <Card name="Abhishek Dallas" description="Aspiring fullstack SDE learning MERN stack" interests={["Coding", "OSS", "Anime", "Games"]} socialMediaHandles={[{ title: "Github", link: "https://github.com/dev-spectre" }, { title: "LinkedIn", link: "https://www.linkedin.com/in/abhishekdallas"}]} />
      <Card name="Abhishek Dallas" description="Aspiring fullstack SDE learning MERN stack" interests={["Coding", "OSS", "Anime", "Games"]} socialMediaHandles={[{ title: "Github", link: "https://github.com/dev-spectre" }, { title: "LinkedIn", link: "https://www.linkedin.com/in/abhishekdallas"}]} />
    </>
  );
}

export default App;
