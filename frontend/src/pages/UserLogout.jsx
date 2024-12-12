import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const UserLogout = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            // If no token, redirect to login immediately
            navigate('/login');
            return;
        }

        axios
            .get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    localStorage.removeItem('token'); // Remove token from storage
                    navigate('/login'); // Redirect to login page
                }
            })
            .catch((error) => {
                console.error('Logout failed:', error);
                // Redirect to login even if the logout API call fails
                navigate('/login');
            });
    }, [token, navigate]);

    return (
        <div>Logging out...</div>
    );
};

export default UserLogout;
