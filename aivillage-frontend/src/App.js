import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import PersonaList from './components/PersonaList';
import PersonaCard from './components/PersonaCard'; // Import the PersonaCard component
import Conversation from './components/Conversation';
import GeneratePersona from './components/GeneratePersona';
import Login from './components/Login';
import PersonasPage from './components/PersonasPage';
import ProtectedRoute from './components/ProtectedRoute';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import API from './api'; // Import API for fetching personas

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const [selectedPersonas, setSelectedPersonas] = useState([]); // Changed from selectedPersona to selectedPersonas for multi-chat
  const [username, setUsername] = useState('User');
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoggedIn(true);
    setUsername('John Doe');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setLoggedIn(false);
    setUsername(''); // Clear the username on logout
    navigate('/login');
  };


  return (
    <div className="app-layout">
      {loggedIn && <TopBar onLogout={handleLogout} />}
      <div className="main-content">
        {loggedIn && <Sidebar username={username} onLogout={handleLogout}/>}
        <div className="content-container">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <LandingPage
                    selectedPersonas={selectedPersonas} // Pass selected personas
                    onSelectPersonas={setSelectedPersonas}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/personas"
              element={
                <ProtectedRoute>
                  <PersonasPage
                    selectedPersonas={selectedPersonas} // Pass state to preserve selection
                    onSelectPersonas={setSelectedPersonas}
                  />
                </ProtectedRoute>
              }
            />
            <Route path="/generate-persona" element={
              <ProtectedRoute>
                <div className="flex-container">
                  <GeneratePersona/>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;