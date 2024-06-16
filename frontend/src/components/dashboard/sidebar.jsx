import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaFileAlt, FaSignOutAlt } from 'react-icons/fa';
import { BiUser } from 'react-icons/bi';
import { useEffect } from 'react';
import './Sidebar.css';
import socketClient  from "socket.io-client";


const Sidebar = ({socketInstance}) => {
 
 const guideId = localStorage.getItem('userId');

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    socketInstance.emit('guideConnected', { guideId });
    socketInstance.on('alert', (data) => {
      console.log('Request received:', data);
    });
  }, []);

    
  

  return (
    <div className="sidebar">
      <div className='user-image-wrapper'>
        <div className='user-image'>
          <BiUser style={{ fontSize: "40px" }} />
        </div>
        <p>Jyoti Raut </p>
      </div>
      <div className="menu">
        <Link to="/home" className="menu-item">
          <FaHome />
          <span>Home</span>
        </Link>
        <Link to="/dash" className="menu-item">
          <FaUser />
          <span>Profile</span>
        </Link>
        <Link to="/trips" className="menu-item">
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
