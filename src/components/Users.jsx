import axios from "axios";
import React from "react";
import { baseUrl } from "./constants";

export const Users = () => {
  const [users, setUsers] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState({userName:'', contact: undefined, experienceLevel: undefined});

  const [newUser, setNewUser] = React.useState({userName:'', contact: undefined, experienceLevel: undefined});

  const onChange = (key, e) => {
    if(newUser.experienceLevel > 10) newUser.experienceLevel = 10;
    if(newUser.experienceLevel < 1) newUser.experienceLevel = 1;
    newUser.experienceLevel = Math.round(newUser.experienceLevel);

    setNewUser({ ...newUser, [key]: e.target.value });
  };

  const onChangeEdit = (key, e) => {
    if(selectedUser.experienceLevel > 10) selectedUser.experienceLevel = 10;
    if(selectedUser.experienceLevel < 1) selectedUser.experienceLevel = 1;
    selectedUser.experienceLevel = Math.round(selectedUser.experienceLevel);

    setSelectedUser({ ...selectedUser, [key]: e.target.value });
  };

  const getUsers = async () => {
    const response = await fetch(`${baseUrl}/users`);
    const responseData = await response.json();
    responseData.sort((a,b) => a.userID - b.userID);
    setUsers(responseData);
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  const isDisabled = React.useMemo(()=>{
    if(!newUser.userName || !newUser.experienceLevel){
      return true;
    }else{
      return false;
    }
  }, [newUser])

  const isEditDisabled = React.useMemo(()=>{
    if(!selectedUser.userName){
      return true;
    }else{
      return false;
    }
  }, [selectedUser.userName])


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

    if(newUser.experienceLevel > 10) newUser.experienceLevel = 10;
    if(newUser.experienceLevel < 1) newUser.experienceLevel = 1;
    newUser.experienceLevel = Math.round(newUser.experienceLevel);

    axios
      .post(`${baseUrl}/addUser`, {
        userName: newUser.userName,
        contact: newUser.contact || '',
        experienceLevel: Number(newUser.experienceLevel),
      })
      .then((response) => {
        getUsers();
        setNewUser({userName:'', contact: undefined, experienceLevel: undefined});
      })
      .catch((err) => console.log(err));
  };

  const editUser = (i) => {
    setShowForm(true);
    setSelectedUser(users[i]);
  };

  const handleEdit = (e) => {
    e.preventDefault();

    if(selectedUser.experienceLevel > 10) selectedUser.experienceLevel = 10;
    if(selectedUser.experienceLevel < 1) selectedUser.experienceLevel = 1;
    selectedUser.experienceLevel = Math.round(selectedUser.experienceLevel);

    axios
      .put(`${baseUrl}/editUser`, {
        userID: Number(selectedUser.userID),
        userName: selectedUser.userName,
        contact: selectedUser.contact,
        experienceLevel: Number(selectedUser.experienceLevel),
      })
      .then((resp) => getUsers());
    setShowForm(false);
  };

  return (
    <div className='container'>
      <h2>HikeWell DB Admin</h2>
      <nav className={"nav-bar"}>
        <ul>
          <li>
            <a href="/"> Home </a>
          </li>
          <li>
            <a href="/trails"> Trails </a>
          </li>
          <li>
            <a href="/maps"> Maps </a>
          </li>
          <li>
            <a href="/trailmaps"> TrailMaps </a>
          </li>
          <li>
            <a href="/users"> Users </a>
          </li>
          <li>
            <a href="/reviews"> Reviews </a>
          </li>
        </ul>
      </nav>
      <h3>Users Table</h3>
      <p>This is the DB admin page for Users table</p>

      <div style={{ padding: "5px", margin: "20px", border: "1px solid blue" }}>
        <label>
          <b>Add User</b>
        </label>
        <form>
          <div>
            <label> Username* </label>
            <input
              onChange={(e) => onChange("userName", e)}
              value={newUser.userName}
              type="text"
            />
            <label> Contact </label>
            <input
              onChange={(e) => onChange("contact", e)}
              value={newUser.contact}
              type="text"
            />
          </div>
          <div>
            <label> Experience Level (1-10)* </label>
            <input
              value={newUser.experienceLevel}
              onChange={(e) => onChange("experienceLevel", e)}
              type="number"
              min="1"
              max="10"
            />
          </div>
          <div style={{ margin: "10px" }}>
            <button disabled={isDisabled} type={"submit"} onClick={handleAdd}>
              Add User{" "}
            </button>
            <span> * indicates field is required</span>
          </div>
        </form>
      </div>

      {showForm && (
        <div
          style={{ padding: "5px", margin: "20px", border: "1px solid magenta" }}
        >
          <label>
            <b>Edit User</b>
          </label>
          <form>
            <div>
              <label> Username </label>
              <input
                onChange={(e) => onChangeEdit("userName", e)}
                value={selectedUser.userName}
                type="text"
              />
              <label> Contact </label>
              <input
                onChange={(e) => onChangeEdit("contact", e)}
                value={selectedUser.contact}
                type="text"
              />
            </div>
            <div>
              <label> Experience Level (1-10) </label>
              <input
                value={selectedUser.experienceLevel}
                onChange={(e) => onChangeEdit("experienceLevel", e)}
                type="number"
                min="1"
                max="10"
              />
            </div>
            <div style={{ margin: "10px" }}>
              <button disabled={isEditDisabled} type={"submit"} onClick={handleEdit}>
                Edit User{" "}
              </button>
              <button onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ padding: "5px", margin: "20px", border: "1px solid grey" }}>
        <label>List of all registered Users</label>
        <table>
          <thead>
            <tr>
              <th>userID</th>
              <th>userName</th>
              <th>contact</th>
              <th>experienceLevel</th>
              <th>Edit</th>
              <th>Delete</th>
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
                  <button onClick={() => editUser(i)}> Edit </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(row.userID)}> Delete{" "} </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
