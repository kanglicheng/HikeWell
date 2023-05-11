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
            <a href="/about">About </a>
          </li>
          <li>
            <a href="/share">Post a Review </a>
          </li>
          <li>
            <a href="/maps">Share your map! </a>
          </li>
        </ul>
      </nav>
      <label>Search Hiking Trails </label>
      <input placeholder="eg Mt Wilson" type="text" />
      <button type="submit"> Find !</button>

      <h2>Browse Trail Reviews</h2>
    </div>
  );
}

export default App;
