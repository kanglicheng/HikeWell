import React from "react";

export const Maps = () => {
  return (
    <div>
      <h3>Maps Table</h3>

      <button>View All Maps</button>

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
    </div>
  );
};
