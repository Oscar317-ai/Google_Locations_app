import React, { useState, useEffect } from "react";

const UserForm = ({ user, onSave, mapClickLocation }) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    } else {
      setUsername("");
    }
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!mapClickLocation) {
      alert('Please click on the map to set a location.');
      return;
    }
    const userToSave = {
      username,
      location: {
        locationName: mapClickLocation.locationName,
        latitude: mapClickLocation.latitude,
        longitude: mapClickLocation.longitude
      }
    };
    onSave(userToSave);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default UserForm;
