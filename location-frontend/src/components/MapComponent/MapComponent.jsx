import React, { useCallback, useRef, useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import axios from 'axios';
import styles from './MapComponent.module.css';
import LocationService from '../../service/LocationService';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {    
  lat: -0.387970, 
  lng: 37.143035
};

const MapComponent = ({ onMapClick }) => {
  const [directions, setDirections] = useState(null);
  const [locations, setLocations] = useState([]);
  const mapRef = useRef(null);

  const fetchLocations = async () => {
    try {
      const response = await LocationService.getLocations();
      if (response) {
        setLocations(response);
      } else {
        console.error('Expected an array but got:', response.data);
        setLocations([]);
      }
    } catch (error) {
      console.error('Error fetching locations:', error);
      setLocations([]);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const onLoad = useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(function callback(map) {
    mapRef.current = null;
  }, []);

  const handleMapClick = async (event) => {
    const latitude = event.latLng.lat();
    const longitude = event.latLng.lng();

    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    const locationName = `Lat: ${latitude}, Lng: ${longitude}`; // Default location name

    onMapClick({
      locationName,
      latitude,
      longitude
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const origin = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        const destination = {
          lat: latitude,
          lng: longitude
        };

        const directionsService = new google.maps.DirectionsService();
        directionsService.route(
          {
            origin,
            destination,
            travelMode: google.maps.TravelMode.DRIVING
          },
          (response, status) => {
            if (status === 'OK') {
              setDirections(response);
            } else {
              alert('Directions request failed due to ' + status);
            }
          }
        );
      });
    } else {
      alert('Error: Your browser doesn\'t support geolocation.');
    }
  };

  return (
    <LoadScript googleMapsApiKey={LocationService.API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
      >
        {locations.map(location => (
          <Marker 
            key={location.locationId}
            position={{ lat: location.latitude, lng: location.longitude }}
            label={location.username}
          />
        ))}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
