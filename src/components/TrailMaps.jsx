/*
** Citation for dropdown default case[1]:
** Date: 6/12/2023
** Adapted from Aurelio's answer
** I adapted the "selected disabled hidden" approach for our default case, but the rest of the dropdown was our own implementation.
** Source URL: https://stackoverflow.com/questions/3518002/how-can-i-set-the-default-value-for-an-html-select-element
*/

/*
** Citation for finding an array element with a substring[2]:
** Date: 6/12/2023
** Adapted from smnth90's answer
** I adpated the find method for getting the dropdown value from current selected item(for UPDATE), having to get the substring dynamically and null check.
** Source URL: https://stackoverflow.com/questions/4556099/how-do-you-search-an-array-for-a-substring-match#:~:text=The%20simplest%20way%20to%20get,includes(%22substring%22))%3B
*/


import axios from "axios";
import React from "react";
import { baseUrl } from "./constants";

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
    console.log(selectedTrailMap);
  };

  const isDisabled = React.useMemo(()=>{
    if(!currentTrail || !currentMap || currentTrail === "None" || currentMap === "None"){
      return true;
    }
    return false;
  }, [currentMap, currentTrail])

  const isEditDisabled = React.useMemo(()=>{
    if(!selectedTrailMap.newTrailID || !selectedTrailMap.newMapID || selectedTrailMap.newTrailID === "None" || selectedTrailMap.newMapID === "None"){
      return true;
    }
    return false;
  }, [selectedTrailMap.newTrailID, selectedTrailMap.newMapID])

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

  const handleDelete = (trailID, mapID) => {
    axios
      .post(`${baseUrl}/deleteTrailMap`, {
        trailID: Number(trailID),
        mapID: Number(mapID),
      })
      .then((response) => getTrailMaps());
  };

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
      <h3>TrailMaps Table</h3>
      <p>This is the DB admin page for TrailMaps</p>

      <div style={{ padding: "5px", margin: "20px", border: "1px solid blue" }}>
        <label>
          <b>Add TrailMap</b>
        </label>
        <form>
          <div>
            <label> Trail* </label>
            <select
                value={currentTrail}
                onChange={(e) => setCurrentTrail(e.target.value)}
            >
                <option value="None">None</option>
                {trailIDs.map((id) => (
                <option key={id}>{id}</option>
                ))}
            </select>
            <label> Map* </label>
            <select
                value={currentMap}
                onChange={(e) => setCurrentMap(e.target.value)}
            >
                <option value="None">None</option>
                {mapIDs.map((id) => (
                <option key={id}>{id}</option>
                ))}
            </select>
          </div>
          <div style={{ margin: "10px" }}>
            <button disabled={isDisabled} onClick={handleAddTrailMap}> Add TrailMap</button>
            <span> * indicates field is required</span>
          </div>
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
          <label>
            <b>Edit TrailMap</b>
          </label>
          <form>
            <div>
              <label> Trail* </label>
              <select onChange={(e) => onChangeEdit("newTrailID", e)}>
                {/* Sources:[1],[2] */}
                <option value={selectedTrailMap.newTrailID} selected disabled hidden>
                  {trailIDs.find(element => element.includes(selectedTrailMap.trailID?.toString())) ?? "None"}
                </option>
                {trailIDs.map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </select>
              <label> Map* </label>
              <select onChange={(e) => onChangeEdit("newMapID", e)}>
                {/* Sources:[1],[2] */}
                <option value={selectedTrailMap.newMapID} selected disabled hidden>
                  {mapIDs.find(element => element.includes(selectedTrailMap.mapID?.toString())) ?? "None"}
                </option>
                {mapIDs.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div style={{ margin: "10px" }}>
              <button disabled={isEditDisabled} onClick={handleUpdate}>Update TrailMap</button>
              <button onClick={() => setShowForm(false)}>Cancel</button>
              <span> * indicates field is required</span>
            </div>
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
                  <button onClick={() => handleDelete(row.trailID, row.mapID)}>
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
