import React from "react";

export const TrailMaps = () => {
  return (
    <div>
      <h3>Maps Table</h3>

      <button>View All TrailMaps</button>

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
    </div>
  );
};
