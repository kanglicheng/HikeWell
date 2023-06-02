import React from "react";
import axios from "axios";
import { baseUrl } from "./constants";

export const Trails = () => {
  const [showForm, setShowForm] = React.useState(false);
  const [trails, setTrails] = React.useState([]);
  const [newTrail, setNewTrail] = React.useState({});
  const [selectedTrail, setSelectedTrail] = React.useState({});

  const onChangeNew = (key, e) => {
    setNewTrail({ ...newTrail, [key]: e.target.value });
  };

  const onChangeEdit = (key, e) => {
    setSelectedTrail({ ...selectedTrail, [key]: e.target.value });
  };

  const getTrails = async () => {
    const response = await fetch(`${baseUrl}/trails`);
    const responseData = await response.json();
    setTrails(responseData);
  };

  React.useEffect(() => {
    getTrails();
  }, []);

  const handleDelete = (trailID) => {
    axios
      .post(`${baseUrl}/deleteTrail`, {
        trailID: trailID,
      })
      .then((res) => {
        getTrails();
      });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}/addTrail`, {
        name: newTrail.name,
        city: newTrail.city,
        state: newTrail.state,
        lat: Number(newTrail.lat),
        lng: Number(newTrail.lng),
        distance: Number(newTrail.distance),
      })
      .then((res) => {
        getTrails();
      });
  };

  const editBox = (i) => {
    setShowForm(true);
    setSelectedTrail(trails[i]);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    axios
      .put(`${baseUrl}/editTrail`, {
        trailID: Number(selectedTrail.trailID),
        name: selectedTrail.name,
        city: selectedTrail.city,
        state: selectedTrail.state,
        lat: Number(selectedTrail.lat),
        lng: Number(selectedTrail.lng),
        distance: Number(selectedTrail.distance),
      })
      .then((res) => {
        getTrails();
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
      <h3>Trails Table</h3>
      <p>This is the db admin page for the Trails Table</p>

      <div style={{ padding: "5px", margin: "20px", border: "1px solid blue" }}>
        <label>
          <b>Add a Trail</b>
        </label>
        <form>
          <div>
            <label>Name </label>
            <input
              value={newTrail.name || ""}
              onChange={(e) => onChangeNew("name", e)}
              type="text"
            />
            <label>City </label>
            <input
              onChange={(e) => onChangeNew("city", e)}
              value={newTrail.city || ""}
              type="text"
            />
          </div>
          <div>
            <label> State </label>
            <input
              onChange={(e) => onChangeNew("state", e)}
              value={newTrail.state || ""}
              type="text"
            />
            <label> Latitude </label>
            <input
              onChange={(e) => onChangeNew("lat", e)}
              value={newTrail.lat || ""}
              type="number"
            />
            <label> Longitude </label>
            <input
              onChange={(e) => onChangeNew("lng", e)}
              value={newTrail.lng || ""}
              type="number"
            />
            <label> Distance </label>
            <input
              onChange={(e) => onChangeNew("distance", e)}
              value={newTrail.distance || ""}
              type="number"
            />
          </div>
          <div style={{ margin: "10px" }}>
            <button type={"submit"} onClick={handleAdd}>
              Add Trail{" "}
            </button>
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
          <form>
            <div>
              <label>Name</label>
              <input
                onChange={(e) => onChangeEdit("name", e)}
                value={selectedTrail.name}
                type="text"
                placeholder={selectedTrail.name}
              />
              <label>City</label>
              <input
                onChange={(e) => onChangeEdit("city", e)}
                value={selectedTrail.city}
                type="text"
                placeholder={selectedTrail.city}
              />
            </div>
            <div>
              <label>State</label>
              <input
                onChange={(e) => onChangeEdit("state", e)}
                value={selectedTrail.state}
                type="text"
                placeholder={selectedTrail.state}
              />
              <label>Latitude</label>
              <input
                onChange={(e) => onChangeEdit("lat", e)}
                value={selectedTrail.lat}
                type="number"
                placeholder={selectedTrail.lat}
              />
              <label>Longitude</label>
              <input
                onChange={(e) => onChangeEdit("lng", e)}
                value={selectedTrail.lng}
                type="number"
                placeholder={selectedTrail.lng}
              />
              <label>Distance</label>
              <input
                onChange={(e) => onChangeEdit("distance", e)}
                value={selectedTrail.distance}
                type="number"
                placeholder={selectedTrail.distance}
              />
            </div>
            <button type={"submit"} onClick={handleEdit}>
              Update Trail
            </button>
            <button onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </div>
      )}

      <div style={{ padding: "5px", margin: "20px", border: "1px solid grey" }}>
        <label>List of all trails known to HikeWell</label>
        <table>
          <thead>
            <tr>
              <th>trailID</th>
              <th>name</th>
              <th>city</th>
              <th>state</th>
              <th>latitude</th>
              <th>longitude</th>
              <th>distance</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {trails.map((data, i) => (
              <tr key={data.trailID}>
                <td>{data.trailID}</td>
                <td>{data.name}</td>
                <td>{data.city}</td>
                <td>{data.state}</td>
                <td>{data.lat}</td>
                <td>{data.lng}</td>
                <td>{data.distance}</td>
                <td>
                  <button onClick={() => editBox(i)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(data.trailID)}>
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
