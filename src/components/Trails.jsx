import React from "react";

export const Trails = () => {
  const [showForm, setShowForm] = React.useState(false);
  const [selectedTrail, setSelectedTrail] = React.useState("");

  const handleSelection = (e) => {
    setSelectedTrail(e.target.value);
    setShowForm(true);
  };

  return (
    <div>
      <h3>Trails Table</h3>

      <button>View All Trais</button>

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

      <div>
        <label>Update a Trail</label>
        <select onChange={handleSelection}>
          <option>Mt Wilson</option>
          <option>Moose Mountain</option>
        </select>
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
          </form>
        </div>
      )}

      <div>
        <label>Delete a Trail</label>
        <select>
          <option>Mt Wilson</option>
          <option>Moose Mountain</option>
        </select>
      </div>
    </div>
  );
};
