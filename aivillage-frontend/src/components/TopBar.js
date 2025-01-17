import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons'; // Import the cogwheel icon

const TopBar = ({ onLogout }) => {
  return (
    <div className="top-bar">
      <h1>aiVillage</h1>
      <div className="top-bar-icons">
        <FontAwesomeIcon 
          icon={faCog} 
          className="settings-icon" 
          style={{ cursor: 'pointer' }} // Change cursor to pointer
        />
      </div>
    </div>
  );
};

export default TopBar;