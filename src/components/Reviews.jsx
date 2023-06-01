import React from "react";
import axios from "axios";
import { baseUrl } from "./constants";

export const Reviews = () => {
  const [showForm, setShowForm] = React.useState(false);
  const [selectedReview, setSelectedReview] = React.useState("");
  const [reviews, setReviews] = React.useState([]);
  const [newReview, setNewReview] = React.useState({});

  const handleEdit = (i) => {
    setShowForm(true);
    setSelectedReview(reviews[i].description);
  };

  const onChange = (key, e) => {
    setNewReview({ ...newReview, [key]: e.target.value });
  };

  React.useEffect(() => {
    const getReviews = async () => {
      const response = await fetch(`${baseUrl}/reviews`);
      const responseData = await response.json();
      setReviews(responseData);
    };
    getReviews();
  }, []);

  const handleDelete = (reviewID) => {
    axios.post(`${baseUrl}/deleteReview`, {
      reviewID: reviewID,
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    axios.post(`${baseUrl}/addReview`, {
      enjoyability: Number(newReview.enjoyability),
      difficulty: Number(newReview.difficulty),
      description: newReview.description,
      userID: Number(newReview.userID),
      trailID: Number(newReview.trailID),
    });
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
      <h3>Reviews Table</h3>
      <p>This is the admin page for Reviews Table</p>

      <div style={{ padding: "5px", margin: "20px", border: "1px solid blue" }}>
        <label>
          <b>Add a Review</b>
        </label>
        <form>
          <div>
            <label>Enjoyability</label>
            <input 
              onChange={(e) => onChange("enjoyability", e)}
              value={newReview.enjoyability}
              type="number" 
            />
            <label>Difficulty</label>
            <input 
              onChange={(e) => onChange("difficulty", e)}
              value={newReview.difficulty}
              type="number" 
            />
          </div>
          <div>
            <label>Description</label>
            <input 
              onChange={(e) => onChange("description", e)}
              value={newReview.description}
              type="test" 
            />
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
            <button type={"submit"} onClick={handleAdd}>
              Add Review{" "}
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
              <label>Enjoyability</label>
              <input type="number" />
              <label>Difficulty</label>
              <input type="number" />
            </div>
            <div>
              <label>Description</label>
              <input placeholder={selectedReview} type="text" />
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
            <button onClick={() => setShowForm(false)}>Update Review</button>
            <button onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </div>
      )}

      <div style={{ padding: "5px", margin: "20px", border: "1px solid grey" }}>
        <label>List of all user submitted Reviews</label>
        <table>
          <thead>
            <tr>
              <th>reviewID</th>
              <th>enjoyability</th>
              <th>difficulty</th>
              <th>description</th>
              <th>userID</th>
              <th>trailID</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((row, i) => (
              <tr>
                <td>{row.reviewID}</td>
                <td>{row.enjoyability}</td>
                <td>{row.difficulty}</td>
                <td>{row.description}</td>
                <td>{row.userID}</td>
                <td>{row.trailID}</td>
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
