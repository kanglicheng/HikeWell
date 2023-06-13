import React from "react";
import "./App.css";

function App() {
  return (
    <div className='container'>
      <h2>HikeWell DB Admin</h2>
      <nav className={"nav-bar"}>
        <ul>
          <li>
            <a href="/"> Home </a>
          </li>
          <li>
            <a href="/trails"> Trails </a>
          </li>
          <li>
            <a href="/maps"> Maps </a>
          </li>
          <li>
            <a href="/trailmaps"> TrailMaps </a>
          </li>
          <li>
            <a href="/users"> Users </a>
          </li>
          <li>
            <a href="/reviews"> Reviews </a>
          </li>
        </ul>
      </nav>
      <label>Search Hiking Trails </label>
      <input placeholder="eg Mt Wilson" type="text" />
      <button type="submit"> Find !</button>
      <div>
        <p>
          Built by Kang-Li Cheng and Darren Garnett, June 2023
        </p>
      </div>
    </div>
  );
}

export default App;
