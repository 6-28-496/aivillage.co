import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

const LandingPersonaCard = ({ persona, onSelect, conversations, isQuestionSubmitted, maxHeights }) => {
  const personaUrl = `${process.env.PUBLIC_URL}/${persona.age>=45 ? "old":"young"}_${persona.gender}.png`;
  const fallBackUrl = `${process.env.PUBLIC_URL}/young_Female.png`;

  return (
    <div className="landing-persona-card" onClick={() => onSelect([persona])}>
      <img src={personaUrl} onError={fallBackUrl} className="persona-image" alt={`${persona.name}`} />
      <h3>{persona.name}</h3>

      {!isQuestionSubmitted && (
        <div className="card-preview">
            <div className="card-prop-container">
            <p>
                <strong>Age:</strong>
            </p>
            <p>{persona.age}</p>
            </div>
            <div className="card-prop-container">
            <p>
                <strong>Role:</strong>
            </p>
            <p>{persona.role}</p>
            </div>
            <div className="card-prop-container">
            <p>
                <strong>Location:</strong>
            </p>
            <p>{persona.location}</p>
            </div>
            <div className="card-prop-container">
            <p>
                <strong>Gender:</strong>
            </p>
            <p>{persona.gender}</p>
            </div>
            <div className="card-prop-container">
            <p>
                <strong>Interests:</strong>
            </p>
            <p>{persona.interests.join(', ')}</p>
            </div>
        </div>
      )}

      {isQuestionSubmitted && (
        <div className="conversation-container">
          {conversations.length === 0 ? (
            <p>No conversation history yet.</p>
          ) : (
            conversations.map((conv, idx) => (
              <div key={idx} className="conversation-item"
                style={{
                  height: `${maxHeights[conv.question] || 'auto'}px`,
                }}
              >
                <strong>Q:</strong> {conv.question} <br />
                <strong>A:</strong> {conv.response}
              </div>
            ))
          )}
        </div>
      )}

      <div className="chat-icon-container">
        <FontAwesomeIcon icon={faComment} className="chat-icon" />
        <span className="tooltip">Chat with {persona.name}</span>
      </div>
    </div>
  );
};

export default LandingPersonaCard;
