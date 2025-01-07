import React, { useContext, useEffect, useState } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../componants/Loading'; // Import the Loading component

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data.user);
        setIsLoading(false); // Stop loading after user is verified
      })
      .catch((err) => {
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [token, navigate, setUser]);

  if (isLoading) {
    return <Loading />; // Show the loading spinner while verifying the user
  }

  return <>{children}</>;
};

export default UserProtectWrapper;
