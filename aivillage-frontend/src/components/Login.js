import React, { useState } from 'react';
import API from '../api'; // Axios instance for API requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');  // Use username for JWT auth
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make the request to obtain the JWT token
      const response = await API.post('/api/token/', { username, password });
      const { access, refresh } = response.data;

      // Store the tokens in localStorage
      localStorage.setItem('token', access);
      localStorage.setItem('refreshToken', refresh);

      // Notify the app that the user is logged in
      onLogin();

      // Redirect to the protected route
      navigate('/'); // Navigate to the home route
    } catch (err) {
      console.error(err); // Log the error for debugging
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
