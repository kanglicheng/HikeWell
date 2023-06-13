/*
** Citation for table sorting[1]:
** Date: 6/12/2023
** Copied from the answer including Wogan, Peter Mortensen, and Andre Figueiredo
** I copied the numeric approach, just changing the variable names to fit.
** Source URL: https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
*/

/* 
** Citation for rounding to desired decimal place[2]:
** Date: 6/12/2023
** Adapted from Syed Minhal Abbas
** I adapted the values and names to fit, utilizing the rounding approach for different degrees of precision.
** Source URL: https://linuxhint.com/round-number-to-2-decimal-places-javascript/
*/

import axios from "axios";
import React from "react";
import { baseUrl } from "./constants";

export const Trails = () => {
  const [showForm, setShowForm] = React.useState(false);
  const [trails, setTrails] = React.useState([]);
  const [newTrail, setNewTrail] = React.useState({
    name: '', city: '', state: '', lat: undefined, lng: undefined, distance: undefined
  });
  const [selectedTrail, setSelectedTrail] = React.useState({
    name: '', city: '', state: '', lat: undefined, lng: undefined, distance: undefined
  });

  const onChangeNew = (key, e) => {
    if(newTrail.lat > 90) newTrail.lat = 90;
    if(newTrail.lng > 180) newTrail.lng = 180;
    if(newTrail.lat < -90) newTrail.lat = -90;
    if(newTrail.lng < -180) newTrail.lng = -180;
    if(newTrail.distance < 0.01) newTrail.distance = 0.01;

    //Source:[2]
    newTrail.lat = Math.round(newTrail.lat * 10000) / 10000;
    newTrail.lng = Math.round(newTrail.lng * 10000) / 10000;
    newTrail.distance = Math.round(newTrail.distance * 100) / 100;

    setNewTrail({ ...newTrail, [key]: e.target.value });
  };

  const onChangeEdit = (key, e) => {
    if(selectedTrail.lat > 90) selectedTrail.lat = 90;
    if(selectedTrail.lng > 180) selectedTrail.lng = 180;
    if(selectedTrail.lat < -90) selectedTrail.lat = -90;
    if(selectedTrail.lng < -180) selectedTrail.lng = -180;
    if(selectedTrail.distance < 0.01) selectedTrail.distance = 0.01;

    //Source:[2]
    selectedTrail.lat = Math.round(selectedTrail.lat * 10000) / 10000;
    selectedTrail.lng = Math.round(selectedTrail.lng * 10000) / 10000;
    selectedTrail.distance = Math.round(selectedTrail.distance * 100) / 100;

    setSelectedTrail({ ...selectedTrail, [key]: e.target.value });
  };

  const getTrails = async () => {
    const response = await fetch(`${baseUrl}/trails`);
    const responseData = await response.json();

    //Source:[1]
    responseData.sort((a,b) => a.trailID - b.trailID);

    setTrails(responseData);
  };

  React.useEffect(() => {
    getTrails();
  }, []);

  const isDisabled = React.useMemo(()=>{

    if(!newTrail.name || !newTrail.city || !newTrail.state || !newTrail.lat || 
      !newTrail.lng || !newTrail.distance){
        return true;
      }
    else {
      return false;
    }

  }, [newTrail])

  const isEditDisabled = React.useMemo(()=>{

    if(!selectedTrail.name || !selectedTrail.city || !selectedTrail.state || !selectedTrail.lat || 
      !selectedTrail.lng || !selectedTrail.distance){
        return true;
      }
    else {
      return false;
    }

  }, [selectedTrail])

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

    if(newTrail.lat > 90) newTrail.lat = 90;
    if(newTrail.lng > 180) newTrail.lng = 180;
    if(newTrail.lat < -90) newTrail.lat = -90;
    if(newTrail.lng < -180) newTrail.lng = -180;
    if(newTrail.distance < 0.01) newTrail.distance = 0.01;

    //Source:[2]
    newTrail.lat = Math.round(newTrail.lat * 10000) / 10000;
    newTrail.lng = Math.round(newTrail.lng * 10000) / 10000;
    newTrail.distance = Math.round(newTrail.distance * 100) / 100;

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

    if(selectedTrail.lat > 90) selectedTrail.lat = 90;
    if(selectedTrail.lng > 180) selectedTrail.lng = 180;
    if(selectedTrail.lat < -90) selectedTrail.lat = -90;
    if(selectedTrail.lng < -180) selectedTrail.lng = -180;
    if(selectedTrail.distance < 0.01) selectedTrail.distance = 0.01;

    //Source:[2]
    selectedTrail.lat = Math.round(selectedTrail.lat * 10000) / 10000;
    selectedTrail.lng = Math.round(selectedTrail.lng * 10000) / 10000;
    selectedTrail.distance = Math.round(selectedTrail.distance * 100) / 100;

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
      <h3>Trails Table</h3>
      <p>This is the db admin page for the Trails Table</p>

      <div style={{ padding: "5px", margin: "20px", border: "1px solid blue" }}>
        <label>
          <b>Add Trail</b>
        </label>
        <form>
          <div>
            <label> Name* </label>
            <input
              value={newTrail.name || ""}
              onChange={(e) => onChangeNew("name", e)}
              type="text"
            />
            <label> City* </label>
            <input
              onChange={(e) => onChangeNew("city", e)}
              value={newTrail.city || ""}
              type="text"
            />
          </div>
          <div>
            <label> State* </label>
            <input
              onChange={(e) => onChangeNew("state", e)}
              value={newTrail.state || ""}
              type="text"
            />
            <label> Latitude* </label>
            <input
              onChange={(e) => onChangeNew("lat", e)}
              value={newTrail.lat || ""}
              type="number"
              min="-90"
              max="90"
            />
            <label> Longitude* </label>
            <input
              onChange={(e) => onChangeNew("lng", e)}
              value={newTrail.lng || ""}
              type="number"
              min="-180"
              max="180"
            />
            <label> Distance </label>
            <input
              onChange={(e) => onChangeNew("distance", e)}
              value={newTrail.distance || ""}
              type="number"
              min="0"
            />
          </div>
          <div style={{ margin: "10px" }}>
            <button type={"submit"} onClick={handleAdd} disabled={isDisabled}>
              Add Trail{" "}
            </button>
            <span>* denotes required field</span>
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
            <b>Edit Trail</b>
          </label>
          <form>
            <div>
              <label> Name </label>
              <input
                onChange={(e) => onChangeEdit("name", e)}
                value={selectedTrail.name}
                type="text"
                placeholder={selectedTrail.name}
              />
              <label> City </label>
              <input
                onChange={(e) => onChangeEdit("city", e)}
                value={selectedTrail.city}
                type="text"
                placeholder={selectedTrail.city}
              />
            </div>
            <div>
              <label> State </label>
              <input
                onChange={(e) => onChangeEdit("state", e)}
                value={selectedTrail.state}
                type="text"
                placeholder={selectedTrail.state}
              />
              <label> Latitude </label>
              <input
                onChange={(e) => onChangeEdit("lat", e)}
                value={selectedTrail.lat}
                type="number"
                placeholder={selectedTrail.lat}
                min="-90"
                max="90"
              />
              <label> Longitude </label>
              <input
                onChange={(e) => onChangeEdit("lng", e)}
                value={selectedTrail.lng}
                type="number"
                placeholder={selectedTrail.lng}
                min="-180"
                max="180"
              />
              <label> Distance </label>
              <input
                onChange={(e) => onChangeEdit("distance", e)}
                value={selectedTrail.distance}
                type="number"
                placeholder={selectedTrail.distance}
                min="0"
              />
            </div>
            <button type={"submit"} onClick={handleEdit} disabled={isEditDisabled}>
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
