import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            console.warn('No token found in localStorage.');
            navigate('/captain-login');
            return;
        }

        const logout = async () => {
            try {
                const baseURL = import.meta.env.VITE_BASE_URL;
                if (!baseURL) {
                    console.error('Base URL is not defined. Check your .env file.');
                    navigate('/captain-login');
                    return;
                }

                console.log('Token:', token);
                console.log('Base URL:', baseURL);

                const response = await axios.get(`${baseURL}/captain/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    console.log('Logout successful.');
                    localStorage.removeItem('token'); // Remove the token
                    navigate('/captain-login'); // Redirect to login page
                }
            } catch (error) {
                if (error.response) {
                    console.error(
                        `Logout failed. Status: ${error.response.status}, Message: ${error.response.data.message}`
                    );

                    // Handle specific error codes
                    if (error.response.status === 401) {
                        console.warn('Token is invalid or expired.');
                        localStorage.removeItem('token'); // Remove invalid token
                    }
                } else {
                    console.error('Logout failed:', error.message);
                }

                // Redirect to login page regardless of the error
                navigate('/captain-home');
            }
        };

        logout();
    }, [token, navigate]);

    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex items-center gap-2 text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
        <span>Loading...</span>
      </div>
    </div>
    );
};

export default CaptainLogout;
