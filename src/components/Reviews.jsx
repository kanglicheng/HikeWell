import React from "react";

export const Reviews = () => {
  const [showForm, setShowForm] = React.useState(false);
  const [selectedReview, setSelectedReview] = React.useState("");

  const handleChange = (e) => {
    setShowForm(true);
    setSelectedReview(e.target.value);
  };

  return (
    <div>
      <h3>Reviews Table</h3>

      <button>View All Reviews</button>

      <div style={{ padding: "5px", margin: "20px", border: "1px solid blue" }}>
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
              <option>Darren</option>
              <option>Andrew</option>
            </select>
            <label>Trail</label>
            <select>
              <option>Mt Wilson</option>
              <option>Moose Mountain</option>
            </select>
          </div>
          <div style={{ margin: "10px" }}>
            <button>Add Review </button>
          </div>
        </form>
      </div>

      <div>
        Update a Review
        <select onChange={handleChange}>
          <option>It was a tough hike</option>
          <option>Would recommend!</option>
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
              <input type="text" placeholder={selectedReview} />
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
            <button onClick={() => setShowForm(false)}>Update Review</button>
          </form>
        </div>
      )}
    </div>
  );
};
