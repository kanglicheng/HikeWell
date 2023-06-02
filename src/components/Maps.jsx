import React from "react";
import axios from "axios";
import { baseUrl } from "./constants";

export const Maps = () => {
  const [maps, setMaps] = React.useState([]);

  React.useEffect(() => {
    const getMaps = async () => {
      const response = await fetch(`${baseUrl}/maps`);
      const responseData = await response.json();
      setMaps(responseData);
    };
    getMaps();
  }, []);

  return (
    <div>
      <h2>HikeWell DB Admin</h2>
      <nav className={"nav-bar"}>
        <ul>
          <li>
            <a href="/">Home </a>
          </li>
          <li>
            <a href="/trails">Trails</a>
          </li>
          <li>
            <a href="/reviews">Reviews</a>
          </li>
          <li>
            <a href="/maps">Maps</a>
          </li>
          <li>
            <a href="/users">Users</a>
          </li>
          <li>
            <a href="/trailmaps">TrailMaps</a>
          </li>
        </ul>
      </nav>
      <h3>Maps Table</h3>
      <p>This is the DB admin page for Maps Table</p>

      <div style={{ padding: "5px", margin: "20px", border: "1px solid blue" }}>
        <label>
          <b>Add a Map</b>
        </label>
        <form>
          <label>Title</label>
          <input type="text" />
          <label>URL</label>
          <input type="text" />
          <button>Add Map </button>
        </form>
      </div>

      <div style={{ padding: "5px", margin: "20px", border: "1px solid grey" }}>
        <label>List of all user submitted Maps</label>
        <table>
          <colgroup>
            <col span={3} />
          </colgroup>
          <thead>
            <tr>
              <th>mapID</th>
              <th>title</th>
              <th>url</th>
            </tr>
          </thead>
          <tbody>
            {maps.map((row, i) => (
              <tr>
                <td>{row.mapID}</td>
                <td>{row.title}</td>
                <td>{row.url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
