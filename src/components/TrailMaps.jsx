import React from "react";

export const TrailMaps = () => {
  const mockTrailMapData = [
    { trailID: 1, mapID: 1 },
    { trailID: 2, mapID: 2 },
  ];

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
      <h3>TrailMaps Table</h3>
      <p>This is the DB admin page for TrailMaps</p>

      <div>
        <label>Add TrailMap</label>
        <form>
          <label>Trail</label>
          <select>
            <option>Oregon Trail</option>
          </select>
          <label>Map</label>
          <select>
            <option>Northwest US</option>
          </select>
        </form>
      </div>
      <div style={{ padding: "5px", margin: "20px", border: "1px solid grey" }}>
        <label>All TrailMap records</label>
        <table>
          <thead>
            <tr>
              <th>trailID</th>
              <th>mapID</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {mockTrailMapData.map((row, i) => (
              <tr>
                <td>{row.trailID}</td>
                <td>{row.mapID}</td>
                <td>
                  <button>Edit</button>
                </td>
                <td>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
