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

  const onChangeNew = (key, e) => {
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

  const getUsernames = async () => {
      const response = await fetch(`${baseUrl}/usernameDropdown`);
      const responseData = await response.json();
      setUsernames(responseData);
    };

  const getTrailNames = async () => {
      const response = await fetch(`${baseUrl}/trailDropdown`);
      const responseData = await response.json();
      setTrailNames(responseData);
    };

  React.useEffect(() => {
    getReviews();
    getUsernames();
    getTrailNames();
  }, []);

  const handleDelete = (reviewID) => {
    axios
      .post(`${baseUrl}/deleteReview`, {
        reviewID: reviewID,
      })
      .then((res) => {
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
        userID: Number(newReview.userID),
        trailID: Number(newReview.trailID),
      })
      .then((res) => {
        getReviews();
      });
  };

  const editBox = (i) => {
    setShowForm(true);
    setSelectedReview(reviews[i]);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    axios
      .put(`${baseUrl}/editReview`, {
        reviewID: Number(selectedReview.reviewID),
        enjoyability: Number(selectedReview.enjoyability),
        difficulty: Number(selectedReview.difficulty),
        description: selectedReview.description,
        userID: Number(selectedReview.userID),
        trailID: Number(selectedReview.trailID),
      })
      .then((res) => {
        getReviews();
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
            <select onChange={(e) => onChangeNew("userID", e)}>
              {usernames.map((row, i) => (
                <option value={newReview.userID} label={row.userName}>
                  {row.userID}
                </option>
              ))}
            </select>
            <label>Trail</label>
            <select onChange={(e) => onChangeNew("trailID", e)}>
              {trailNames.map((row, i) => (
                <option value={newReview.trailID} label={row.name}>
                  {row.trailID}
                </option>
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
                type="number"
                placeholder={selectedReview.enjoyability}
              />
              <label>Difficulty</label>
              <input
                onChange={(e) => onChangeEdit("difficulty", e)}
                value={selectedReview.difficulty}
                type="number"
                placeholder={selectedReview.difficulty}
              />
            </div>
            <div>
              <label>Description</label>
              <input
                onChange={(e) => onChangeEdit("description", e)}
                value={selectedReview.description}
                type="text"
                placeholder={selectedReview.description}
              />
              <label>User</label>
              <select onChange={(e) => onChangeEdit("userID", e)}>
                {usernames.map((row, i) => (
                  <option value={selectedReview.userID} label={row.userName}>
                    {row.userID}
                  </option>
                ))}
              </select>
              <label>Trail</label>
              <select onChange={(e) => onChangeEdit("trailID", e)}>
                {trailNames.map((row, i) => (
                  <option value={selectedReview.trailID} label={row.name}>
                    {row.trailID}
                  </option>
                ))}
              </select>
            </div>
            <button type={"submit"} onClick={handleEdit}>Update Review</button>
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
                  <button onClick={() => editBox(i)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(row.reviewID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
