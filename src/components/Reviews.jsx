import React from "react";

export const Reviews = () => {
  return (
    <div>
      <h3>Reviews Table</h3>

      <button>View All Reviews</button>

      <div style={{ margin: "20px" }}>
        <label>
          <b>Add a Review</b>
        </label>
        <form>
          <div>
            <label>Enjoyability</label>
            <input type="number" />
            <label>Difficulty</label>
            <input type="number" />
          </div>
          <div>
            <label>Description</label>
            <input type="text" />
            <label>User</label>
            <select>
              <option>Steven</option>
            </select>
            <label>Trail</label>
            <select>
              <option>Mt Wilson</option>
            </select>
          </div>
          <div style={{ margin: "10px" }}>
            <button>Add Review </button>
          </div>
        </form>
      </div>
    </div>
  );
};
