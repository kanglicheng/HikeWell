import React from "react";
import { baseUrl } from "./constants";
import axios from "axios";

export const TrailMaps = () => {
  const [showForm, setShowForm] = React.useState(false);
  const [trailMaps, setTrailMaps] = React.useState([]);
  const [trailIDs, setTrailIDS] = React.useState([]);
  const [mapIDs, setMapIDs] = React.useState([]);
  const [selectedTrailMap, setSelectedTrailMap] = React.useState({});

  const [currentTrail, setCurrentTrail] = React.useState(trailIDs[0]);
  const [currentMap, setCurrentMap] = React.useState(mapIDs[0]);

  const handleEdit = (i) => {
    setShowForm(true);
    setSelectedTrailMap(trailMaps[i]);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`${baseUrl}/editTrailMap`, {
        newTrailID: Number(selectedTrailMap.newTrailID.split(" ")[0]),
        newMapID: Number(selectedTrailMap.newMapID.split(" ")[0]),
        trailID: Number(selectedTrailMap.trailID.split(" ")[0]),
        mapID: Number(selectedTrailMap.mapID.split(" ")[0]),
      })
      .then((response) => getTrailMaps());
    setShowForm(false);
  };

  const onChangeEdit = (key, e) => {
    setSelectedTrailMap({ ...selectedTrailMap, [key]: e.target.value });
  };

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

  const handleDelete = (trailID) => {
    axios
      .post(`${baseUrl}/deleteTrailMap`, {
        trailID: Number(trailID),
      })
      .then((response) => getTrailMaps());
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
            <option value="">None</option>
            {trailIDs.map((id) => (
              <option key={id}>{id}</option>
            ))}
          </select>
          <label>Map</label>
          <select
            value={currentMap}
            onChange={(e) => setCurrentMap(e.target.value)}
          >
            <option value="">None</option>
            {mapIDs.map((id) => (
              <option key={id}>{id}</option>
            ))}
          </select>
          <button onClick={handleAddTrailMap}> Add TrailMap</button>
        </form>
      </div>

      {showForm && (
        <div
          style={{
            padding: "5px",
            margin: "20px",
            border: "1px solid magenta",
          }}
        >
          <form>
            <div>
              <label>Trail</label>
              <select 
                onChange={(e) => onChangeEdit("newTrailID", e)}>
                <option value="">None</option>
                {trailIDs.map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </select>
              <label>Map</label>
              <select onChange={(e) => onChangeEdit("newMapID", e)}>
                <option value="">None</option>
                {mapIDs.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <button onClick={handleUpdate}>Update Review</button>
            <button onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </div>
      )}

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
                  <button onClick={() => handleEdit(i)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(row.trailID)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
