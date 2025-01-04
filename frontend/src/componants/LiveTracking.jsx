import React, { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: -3.745,
    lng: -38.523,
};

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(center);

    useEffect(() => {
        // Function to update position
        const updatePosition = (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({
                lat: latitude,
                lng: longitude,
            });
        };

        // Error handling for geolocation
        const handleError = (error) => {
            console.error('Error fetching position:', error.message);
        };

        // Watch position continuously
        const watchId = navigator.geolocation.watchPosition(
            updatePosition,
            handleError,
            { enableHighAccuracy: true }
        );

        // Initial position fetch
        navigator.geolocation.getCurrentPosition(
            updatePosition,
            handleError,
            { enableHighAccuracy: true }
        );

        // Cleanup on unmount
        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, []);

    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPosition}
                zoom={15}
            >
                <Marker position={currentPosition} />
            </GoogleMap>
        </LoadScript>
    );
};

export default LiveTracking;
