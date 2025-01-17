import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import API from '../api';

const GeneratePersona = ({ selectedPersonas }) => {
  const [personaName, setPersonaName] = useState('');
  const [personaPrompt, setPersonaPrompt] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
        
    API.post('/api/generate-persona/', { persona_name: personaName, persona_prompt: personaPrompt })
      .then(_ => {
        setIsLoading(false);
        navigate('/');
      })
      .catch(error => {
        setIsLoading(false);
        console.error(error);
        setError('Failed to create persona.');
      });
  };

  return (
    <div>
      <h2>Generate persona</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!isLoading &&
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Persona name"
            value={personaName}
            onChange={(e) => setPersonaName(e.target.value)}
            required
            />
            <br />
            <textarea
            className="large-textarea"
            placeholder="Persona prompt"
            value={personaPrompt}
            onChange={(e) => setPersonaPrompt(e.target.value)}
            required
            />
            <br />
            <button type="submit">Generate</button>
        </form>
      }
      {isLoading && <img src={require("../assets/loading_icon.gif")} alt="Loading..." />}
    </div>
  );
};

export default GeneratePersona;
