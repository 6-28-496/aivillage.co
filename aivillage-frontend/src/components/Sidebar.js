import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ username, onLogout }) => {
  const [showMenu, setShowMenu] = useState(false); // State to manage dropdown visibility

  const toggleMenu = () => {
    setShowMenu((prev) => !prev); // Toggle the dropdown menu
  };

  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'selected' : '')}>
            <i className="fa fa-home"></i> Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/personas" className={({ isActive }) => (isActive ? 'selected' : '')}>
            <i className="fa fa-id-badge"></i>Select Personas
          </NavLink>
        </li>
      </ul>
      <div className="account-container">
        <button onClick={toggleMenu} className="account-button">
          {username} <i className="fa fa-user"></i>
        </button>
        {showMenu && (
          <div className="account-menu">
            <button onClick={onLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;