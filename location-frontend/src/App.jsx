import { useState } from 'react';
import styles from './App.module.css';
import MapComponent from './components/MapComponent/MapComponent';
import UserList from './components/UserList/UserList';
import UserForm from './components/UserForm/UserForm';
import UserService from './service/UserService';

function App() {
  const [mapClickLocation, setMapClickLocation] = useState(null);

  const handleMapClick = (location) => {
    setMapClickLocation(location);
  };

  const handleSave = async (user) => {
    try {
      if (mapClickLocation) {
        console.log("Map click location:", mapClickLocation);
        await UserService.createUser({
          ...user,
          location: {
            ...mapClickLocation
          }
        });
        alert('User saved successfully!');
        setMapClickLocation(null); // Clear the location after saving
      } else {
        alert('Please click on the map to set a location.');
      }
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Failed to save user.');
    }
  };

  return (
    <div className={styles.appBody}>
      <h1>All users and their locations</h1>
      <MapComponent onMapClick={handleMapClick} />
      <UserForm mapClickLocation={mapClickLocation} onSave={handleSave} />
      <UserList />
    </div>
  );
}

export default App;
