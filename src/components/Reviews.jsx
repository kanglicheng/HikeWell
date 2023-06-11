import React from "react";
import axios from "axios";
import { baseUrl } from "./constants";

export const Reviews = () => {
  const [showForm, setShowForm] = React.useState(false);
  const [reviews, setReviews] = React.useState([]);
  const [newReview, setNewReview] = React.useState({});
  const [selectedReview, setSelectedReview] = React.useState({});
  const [usernames, setUsernames] = React.useState([]);
  const [trailNames, setTrailNames] = React.useState([]);

  const [selectedTrailID, setSelectedTrailID] = React.useState("");
  const [selectedUserID, setSelectedUserID] = React.useState("");

  const [userChoices, setUserChoices] = React.useState([]);
  const [trailChoices, setTrailChoices] = React.useState([]);

  const handleEdit = (i) => {
    setShowForm(true);
    setSelectedReview(reviews[i]);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`${baseUrl}/editReview`, {
        reviewID: Number(selectedReview.reviewID),
        enjoyability: Number(selectedReview.enjoyability),
        difficulty: Number(selectedReview.difficulty),
        description: selectedReview.description,
        userID: Number(selectedReview.userID.split(" ")[0]),
        trailID: Number(selectedReview.trailID.split(" ")[0]),
      })
      .then((response) => getReviews());
    setShowForm(false);
  };

  const onChange = (key, e) => {
    setNewReview({ ...newReview, [key]: e.target.value });
  };

  const onChangeEdit = (key, e) => {
    setSelectedReview({ ...selectedReview, [key]: e.target.value });
  };

  const getReviews = async () => {
    const response = await fetch(`${baseUrl}/reviews`);
    const responseData = await response.json();
    setReviews(responseData);
  };

  const getUsers = async () => {
    const response = await fetch(`${baseUrl}/users`);
    const data = await response.json();
    const choices = data.map((d) => d.userID + " " + d.userName);
    setUserChoices(choices);
  };

  const getTrails = async () => {
    const response = await fetch(`${baseUrl}/trails`);
    const data = await response.json();
    const choices = data.map((d) => d.trailID + " " + d.name);
    setTrailChoices(choices);
  };

  React.useEffect(() => {
    getUsers();
    getReviews();
    getTrails();
  }, []);

  const handleDelete = (reviewID) => {
    axios
      .post(`${baseUrl}/deleteReview`, {
        reviewID: reviewID,
      })
      .then((response) => {
        getReviews();
      });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}/addReview`, {
        enjoyability: Number(newReview.enjoyability),
        difficulty: Number(newReview.difficulty),
        description: newReview.description,
        userID: Number(selectedUserID.split(" ")[0]),
        trailID: Number(selectedTrailID.split(" ")[0]),
      })
      .then((response) => getReviews());
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
              onChange={(e) => onChangeNew("enjoyability", e)}
              value={newReview.enjoyability}
              type="number"
            />
            <label>Difficulty</label>
            <input 
              onChange={(e) => onChangeNew("difficulty", e)}
              value={newReview.difficulty}
              type="number"
            />
          </div>
          <div>
            <label>Description</label>
            <input 
              onChange={(e) => onChangeNew("description", e)}
              value={newReview.description}
              type="test"
            />
            <label>User</label>
            <select
              onChange={(e) => setSelectedUserID(e.target.value)}
              value={selectedUserID}
            >
              <option value="">None</option>
              {userChoices.map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>
            <label>Trail</label>
            <select
              onChange={(e) => setSelectedTrailID(e.target.value)}
              value={selectedTrailID}
            >
              <option value="">None</option>
              {trailChoices.map((c) => (
                <option key={c}>{c}</option>
              ))}
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
              <input
                onChange={(e) => onChangeEdit("enjoyability", e)}
                value={selectedReview.enjoyability}
                placeholder={selectedReview.enjoyability}
                type="number"
              />
              <label>Difficulty</label>
              <input
                onChange={(e) => onChangeEdit("difficulty", e)}
                value={selectedReview.difficulty}
                placeholder={selectedReview.difficulty}
                type="number"
              />
            </div>
            <div>
              <label>Description</label>
              <input
                onChange={(e) => onChangeEdit("description", e)}
                value={selectedReview.description}
                placeholder={selectedReview.description}
                type="text"
              />
              <label>User</label>
              <select onChange={(e) => onChangeEdit("userID", e)}>
                <option value="">None</option>
                {userChoices.map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </select>
              <label>Trail</label>
              <select onChange={(e) => onChangeEdit("trailID", e)}>
                <option value="">None</option>
                {trailChoices.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <button onClick={handleUpdate}>Update Review</button>
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
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((row, i) => (
              <tr key={row.reviewID}>
                <td>{row.reviewID}</td>
                <td>{row.enjoyability}</td>
                <td>{row.difficulty}</td>
                <td>{row.description}</td>
                <td>{row.userID}</td>
                <td>{row.trailID}</td>
                <td>
                  <button onClick={() => editBox(i)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(row.reviewID)}>
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
