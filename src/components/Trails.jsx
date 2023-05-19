import React from "react";

export const Trails = () => {
  const [showForm, setShowForm] = React.useState(false);
  const [selectedTrail, setSelectedTrail] = React.useState("");

  const handleEdit = (i) => {
    setShowForm(true);
    setSelectedTrail(mockTrailsData[i].name);
  };

  const mockTrailsData = [
    {
      trailID: 1,
      name: "Mt Wilson",
      city: "Sierra Madre",
      state: "CA",
      lat: 34.1709,
      long: -118.048,
      distance: 14,
    },
    {
      trailID: 2,
      name: "Moose Mountain",
      city: "Canaan",
      state: "NH",
      lat: 53.2,
      long: -89.34,
      distance: 30,
    },
  ];

  return (
    <div>
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
            <input type="text" />
            <label>City </label>
            <input type="text" />
          </div>
          <div>
            <label> State </label>
            <input type="text" />
            <label> Latitude </label>
            <input type="number" />
            <label> Longitude </label>
            <input type="number" />
            <label> Distance </label>
            <input type="number" />
          </div>
          <div style={{ margin: "10px" }}>
            <button> Add Trail </button>
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
              <input type="text" placeholder={selectedTrail} />
              <label>City</label>
              <input type="text" />
            </div>
            <div>
              <label>State</label>
              <input type="text" />
              <label>Latitude</label>
              <input type="number" />
              <label>Longitude</label>
              <input type="number" />
              <label>Distance</label>
              <input type="number" />
            </div>
            <button onClick={() => setShowForm(false)}>Update Trail</button>
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
              <th>lat</th>
              <th>long</th>
              <th>distance</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {mockTrailsData.map((data, i) => (
              <tr>
                <td>{data.trailID}</td>
                <td>{data.name}</td>
                <td>{data.city}</td>
                <td>{data.state}</td>
                <td>{data.lat}</td>
                <td>{data.long}</td>
                <td>{data.distance}</td>
                <td>
                  <button onClick={() => handleEdit(i)}>Edit</button>
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
