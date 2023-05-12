import React from "react";

export const Users = () => {
  return (
    <div>
      <h3>Users Table</h3>

      <button>View All Users</button>

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
    </div>
  );
};
