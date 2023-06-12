import React from "react";
import axios from "axios";
import { baseUrl } from "./constants";

export const Maps = () => {
  const [showForm, setShowForm] = React.useState(false);
  const [maps, setMaps] = React.useState([]);
  const [newMap, setNewMap] = React.useState({});
  const [selectedMap, setSelectedMap] = React.useState({});

  const onChangeNew = (key, e) => {
    setNewMap({ ...newMap, [key]: e.target.value });
  };

  const onChangeEdit = (key, e) => {
    setSelectedMap({ ...selectedMap, [key]: e.target.value });
  };

  const getMaps = async () => {
    const response = await fetch(`${baseUrl}/maps`);
    const responseData = await response.json();
    setMaps(responseData);
  };

  React.useEffect(() => {
    getMaps();
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}/addMap`, {
        title: newMap.title,
        url: newMap.url,
      })
      .then((res) => {
        getMaps();
      });
  };

  const handleDelete = (mapID) => {
    axios
      .post(`${baseUrl}/deleteMap`, {
        mapID: mapID,
      })
      .then((res) => {
        getMaps();
      });
  };

  const editBox = (i) => {
    setShowForm(true);
    setSelectedMap(maps[i]);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    axios
      .put(`${baseUrl}/editMap`, {
        mapID: Number(selectedMap.mapID),
        title: selectedMap.title,
        url: selectedMap.url,
      })
      .then((res) => {
        getMaps();
      });
    setShowForm(false);
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
      <h3>Maps Table</h3>
      <p>This is the DB admin page for Maps Table</p>

      <div style={{ padding: "5px", margin: "20px", border: "1px solid blue" }}>
        <label>
          <b>Add a Map</b>
        </label>
        <form>
          <label>Title</label>
          <input type="text" onChange={(e) => onChangeNew("title", e)} />
          <label>URL</label>
          <input type="text" onChange={(e) => onChangeNew("url", e)} />
          <button onClick={handleAdd}>Add Map </button>
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
            <b>Edit Map</b>
          </label>
          <form>
            <div>
              <label>Title</label>
              <input
                onChange={(e) => onChangeEdit("title", e)}
                value={selectedMap.title}
                type="text"
                placeholder={selectedMap.title}
              />
              <label>url</label>
              <input
                onChange={(e) => onChangeEdit("url", e)}
                value={selectedMap.url}
                type="text"
                placeholder={selectedMap.url}
              />
            </div>
            <button type={"submit"} onClick={handleEdit}>
              Update Map
            </button>
            <button onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </div>
      )}

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
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {maps.map((row, i) => (
              <tr key={row.mapID}>
                <td>{row.mapID}</td>
                <td>{row.title}</td>
                <td>{row.url}</td>
                <td>
                  <button onClick={() => editBox(i)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(row.mapID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
