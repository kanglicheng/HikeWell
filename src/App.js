import "./App.css";
import React from "react";

function App() {
  return (
    <div className="App">
      <h1>HikeWell</h1>
      <nav className={"nav-bar"}>
        <ul>
          <li>
            <a href="/">Home </a>
          </li>
          <li>
            <a href="/trails">Trails Table </a>
          </li>
          <li>
            <a href="/reviews">Reviews Table </a>
          </li>
          <li>
            <a href="/maps">Maps Table </a>
          </li>
          <li>
            <a href="/users">Users Table </a>
          </li>
        </ul>
      </nav>
      <label>Search Hiking Trails </label>
      <input placeholder="eg Mt Wilson" type="text" />
      <button type="submit"> Find !</button>
    </div>
  );
}

export default App;
