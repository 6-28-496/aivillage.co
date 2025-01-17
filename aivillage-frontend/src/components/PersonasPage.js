import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonaCard from './PersonaCard';
import API from '../api';

function PersonasPage({ selectedPersonas, onSelectPersonas }) {
  const [personas, setPersonas] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const response = await API.get('/api/personas/');
        setPersonas(response.data);
      } catch (error) {
        console.error('Failed to fetch personas:', error);
      }
    };
    fetchPersonas();
  }, []);

  const handleSelectPersona = (persona) => {
    const alreadySelected = selectedPersonas.find((p) => p.id === persona.id);

    if (alreadySelected) {
      // Deselect if already selected
      onSelectPersonas(selectedPersonas.filter((p) => p.id !== persona.id));
      if (selectedPersonas.length <= 3) {
        setErrorMessage('');
      }
    } else if (selectedPersonas.length < 3) {
      // Select persona if limit not reached
      onSelectPersonas([...selectedPersonas, persona]);
      setErrorMessage(''); // Clear any error message
    } else {
      // Show error if limit exceeded
      setErrorMessage('Only up to three personas may be selected!');
    }
  };

  return (
    <div>
      <div className="personas-header">
        <h2>My Personas - select up to three</h2>
        <div className="personas-buttons">
          <button
            className="chat-button"
            onClick={() => navigate('/')}
          >
            Chat with Selected Personas
          </button>
          <button
            className="generate-button"
            onClick={() => navigate('/generate-persona')}
          >
            Generate New Persona
          </button>
        </div>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="persona-list">
        {personas.map((persona) => (
          <PersonaCard
            key={persona.id}
            persona={persona}
            isSelected={selectedPersonas.some((p) => p.id === persona.id)} // Check if selected
            onSelect={() => handleSelectPersona(persona)} // Handle selection
          />
        ))}
      </div>
    </div>
  );
}

export default PersonasPage;
