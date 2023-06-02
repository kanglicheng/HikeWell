import React from "react";
import { baseUrl } from "./constants";
import axios from "axios";

export const TrailMaps = () => {
  const [trailMaps, setTrailMaps] = React.useState([]);
  const [trailIDs, setTrailIDS] = React.useState([]);
  const [mapIDs, setMapIDs] = React.useState([]);
  const [currentTrail, setCurrentTrail] = React.useState(trailIDs[0]);
  const [currentMap, setCurrentMap] = React.useState(mapIDs[0]);

  const getTrailMaps = async () => {
    const response = await fetch(`${baseUrl}/trailMaps`);
    const data = await response.json();
    setTrailMaps(data);
  };

  const getTrailIDs = async () => {
    const response = await fetch(`${baseUrl}/trails`);
    const responseData = await response.json();
    const trailIDs = responseData.map((d) => d.trailID + " " + d.name);
    setTrailIDS(trailIDs);
  };

  const getMapIDs = async () => {
    const response = await fetch(`${baseUrl}/maps`);
    const data = await response.json();
    const mapIDs = data.map((d) => d.mapID + " " + d.title);
    setMapIDs(mapIDs);
  };

  React.useEffect(() => {
    getTrailMaps();
    getTrailIDs();
    getMapIDs();
  }, []);

  const handleAddTrailMap = (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}/addTrailMap`, {
        trailID: Number(currentTrail.split(" ")[0]),
        mapID: Number(currentMap.split(" ")[0]),
      })
      .then((response) => {
        getTrailMaps();
      });
  };

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
          <select
            value={currentTrail}
            onChange={(e) => setCurrentTrail(e.target.value)}
          >
            {trailIDs.map((id) => (
              <option key={id}>{id}</option>
            ))}
          </select>
          <label>Map</label>
          <select
            value={currentMap}
            onChange={(e) => setCurrentMap(e.target.value)}
          >
            {mapIDs.map((id) => (
              <option key={id}>{id}</option>
            ))}
          </select>
          <button onClick={handleAddTrailMap}> Add TrailMap</button>
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
            {trailMaps.map((row, i) => (
              <tr key={row.trailID + row.mapID}>
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
