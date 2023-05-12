import React from "react";

export const Users = () => {
  return (
    <div>
      <h3>Users Table</h3>

      <button>View All Users</button>

      <form>
        <label>User ID</label>
        <input type="number" />
        <button>Delete User </button>
      </form>
    </div>
  );
};
