import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaFileAlt, FaSignOutAlt } from 'react-icons/fa';
import { BiUser } from 'react-icons/bi';
import './Sidebar.css';

const Sidebar = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('User ID not found in localStorage');
        }

        const response = await fetch(`http://localhost:3000/api/user/users/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        setUserName(userData.fullName); // Assuming the API response has a 'fullName' field
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        // Handle error fetching user data
      }
    };

    fetchUserName();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handleLogout = () => {
    // Clear local storage items
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('token');

    // Navigate to login or home page after logout
    window.location.href = '/login'; // Replace with your desired redirect path after logout
  };

  return (
    <div className="sidebar">
      <div className='user-image-wrapper'>
        <div className='user-image'>
          <BiUser style={{ fontSize: "40px" }} />
        </div>
        <p>Name: {userName}</p>
      </div>
      <div className="menu">
        <Link to="/blog#" className="menu-item">
          <FaHome />
          <span>Home</span>
        </Link>
        {/* Change the path for Profile to include :email parameter */}
        <Link to={`/dash/${localStorage.getItem('email')}`} className="menu-item">
          <FaUser />
          <span>Profile</span>
        </Link>
        <Link to="/request" className="menu-item">
          <FaFileAlt />
          <span>Request</span>
        </Link>
        <div className="menu-item" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
