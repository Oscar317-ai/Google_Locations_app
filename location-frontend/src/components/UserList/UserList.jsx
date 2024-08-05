import React, { useEffect, useState } from "react";
import UserService from "../../service/UserService";
import UserForm from "../UserForm/UserForm";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const users = await UserService.getUsers();
    setUsers(users);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = async (id) => {
    await UserService.deleteUser(id);
    fetchUsers();
  };

  const handleSave = async (user) => {
    if (editingUser) {
      await UserService.updateUser(editingUser.userId, user);
    } else {
      await UserService.createUser(user);
    }
    setEditingUser(null);
    fetchUsers();
  };

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.userId}>
            {user.username} - {user.location?.locationName || "No Location"}
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.userId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
