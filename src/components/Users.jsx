import React from "react";

export const Users = () => {
  const mockUserData = [
    {
      userID: 1,
      username: "thehiker",
      contact: "thehiker@test.com",
      experienceLevel: 2.5,
    },
    {
      userID: 2,
      username: "darren",
      contact: "darren@test.com",
      experienceLevel: 3.0,
    },
  ];

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
            <input type="text" />
            <label> contact </label>
            <input type="text" />
          </div>
          <div>
            <label>experience level </label>
            <input type="number" />
          </div>
          <div style={{ margin: "10px" }}>
            <button>Add User </button>
          </div>
        </form>
      </div>

      <div style={{ padding: "5px", margin: "20px", border: "1px solid grey" }}>
        <label>List of all registered Users</label>
        <table>
          <thead>
            <tr>
              <th>userID</th>
              <th>username</th>
              <th>contact</th>
              <th>experienceLevel</th>
            </tr>
          </thead>
          <tbody>
            {mockUserData.map((row, i) => (
              <tr>
                <td>{row.userID}</td>
                <td>{row.username}</td>
                <td>{row.contact}</td>
                <td>{row.experienceLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
