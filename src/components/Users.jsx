import React from "react";
import axios from "axios";
import { baseUrl } from "./constants";

export const Users = () => {
  const [users, setUsers] = React.useState([]);

  const [newUser, setNewUser] = React.useState({});

  const onChange = (key, e) => {
    setNewUser({ ...newUser, [key]: e.target.value });
  };

  const getUsers = async () => {
    const response = await fetch(`${baseUrl}/users`);
    const responseData = await response.json();
    setUsers(responseData);
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (userID) => {
    axios
      .post(`${baseUrl}/deleteUser`, {
        userID: userID,
      })
      .then((response) => {
        getUsers();
      })
      .catch((err) => console.log(err));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}/addUser`, {
        userName: newUser.userName,
        contact: newUser.contact,
        experienceLevel: Number(newUser.experienceLevel),
      })
      .then((response) => {
        getUsers();
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    axios.post(`${baseUrl}/editUser`, {
      userName: newUser.userName,
      contact: newUser.contact,
      experienceLevel: Number(newUser.experienceLevel),
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
      <h3>Users Table</h3>
      <p>This is the DB admin page for Users table</p>

      <div style={{ padding: "5px", margin: "20px", border: "1px solid blue" }}>
        <label>
          <b>Add a User</b>
        </label>
        <form>
          <div>
            <label>username </label>
            <input
              onChange={(e) => onChange("userName", e)}
              value={newUser.userName}
              type="text"
            />
            <label> contact </label>
            <input
              onChange={(e) => onChange("contact", e)}
              value={newUser.contact}
              type="text"
            />
          </div>
          <div>
            <label>experience level </label>
            <input
              value={newUser.experienceLevel}
              onChange={(e) => onChange("experienceLevel", e)}
              type="number"
            />
          </div>
          <div style={{ margin: "10px" }}>
            <button type={"submit"} onClick={handleAdd}>
              Add User{" "}
            </button>
          </div>
        </form>
      </div>

      <div style={{ padding: "5px", margin: "20px", border: "1px solid grey" }}>
        <label>List of all registered Users</label>
        <table>
          <thead>
            <tr>
              <th>userID</th>
              <th>userName</th>
              <th>contact</th>
              <th>experienceLevel</th>
              <th>Actions </th>
            </tr>
          </thead>
          <tbody>
            {users.map((row, i) => (
              <tr key={row.userID}>
                <td>{row.userID}</td>
                <td>{row.userName}</td>
                <td>{row.contact}</td>
                <td>{row.experienceLevel}</td>
                <td>
                  <button onClick={() => handleDelete(row.userID)}>
                    Delete{" "}
                  </button>
                  <button> Edit </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
