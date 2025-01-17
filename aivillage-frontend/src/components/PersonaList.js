import React, { useEffect, useState } from 'react';
import API from '../api';

const PersonaList = ({ selectedPersonas, onSelectPersonas, isMultiChat }) => {
  const [personas, setPersonas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get('/api/personas/')
      .then((response) => setPersonas(response.data))
      .catch((error) => {
        console.error(error);
        setError('Failed to load personas.');
      });
  }, []);

  const handleSelectPersona = (persona) => {
    if (isMultiChat) {
      if (selectedPersonas.some((p) => p.id === persona.id)) {
        onSelectPersonas(selectedPersonas.filter((p) => p.id !== persona.id)); // Remove if already selected
      } else {
        onSelectPersonas([...selectedPersonas, persona]); // Add to selected
      }
    } else {
      onSelectPersonas([persona]); // Single selection mode
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="persona-list-container">
      <h2>Select a Persona</h2>
      <ul>
        {personas.map((persona) => (
          <li key={persona.id}>
            <label>
              <input
                type={isMultiChat ? 'checkbox' : 'radio'}
                name="persona"
                value={persona.id}
                checked={selectedPersonas.some((p) => p.id === persona.id)}
                onChange={() => handleSelectPersona(persona)}
              />
              {persona.name}
            </label>
          </li>
        ))}
      </ul>

      {selectedPersonas.length > 0 && (
        <div className="persona-preview">
          <strong>Preview:</strong>
          <ul>
            {selectedPersonas.map((p) => (
              <li key={p.id}><strong>{p.name}</strong><br/>
              Age: {p.age}; Role: {p.role}<br/>
              Location: {p.location}; Gender: {p.gender}<br/>
              Interests: {p.interests.join(", ")} </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PersonaList;
