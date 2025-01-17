import React, { useState, useEffect } from 'react';
import LandingPersonaCard from './LandingPersonaCard';
import API from '../api';

function LandingPage({ selectedPersonas = [], onSelectPersonas }) {
  const [allPersonas, setAllPersonas] = useState([]); // Store all personas fetched from the API
  const [conversations, setConversations] = useState([]);
  const [question, setQuestion] = useState('');
  const [isQuestionSubmitted, setIsQuestionSubmitted] = useState(false);
  const [maxHeights, setMaxHeights] = useState({});

  // Use selected personas or fallback to the first three fetched personas
  const displayedPersonas = selectedPersonas.length > 0
    ? selectedPersonas
    : allPersonas.slice(0, 3);

  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const response = await API.get('/api/personas/');
        setAllPersonas(response.data); // Fetch and store all personas
      } catch (error) {
        console.error('Failed to fetch personas:', error);
      }
    };
    fetchPersonas();
  }, []);

  useEffect(() => {
    const fetchConversations = async () => {
      if (displayedPersonas.length > 0) {
        const personaIds = displayedPersonas.map((persona) => persona.id);
        try {
          const response = await API.get('/api/conversations/', {
            params: { persona_ids: personaIds },
          });
          setConversations(response.data);
        } catch (error) {
          console.error('Failed to fetch conversations:', error);
        }
      }
    };
    fetchConversations();
  }, [displayedPersonas]);

  useEffect(() => {
    const heights = {};
    conversations.forEach((conv) => {
      if (!heights[conv.question]) {
        heights[conv.question] = 0;
      }
      const textLength = conv.response.length + conv.question.length;
      const estimatedHeight = Math.ceil((textLength / 40) + 1) * 25;
      heights[conv.question] = Math.max(heights[conv.question], estimatedHeight);
    });
    setMaxHeights(heights);
  }, [conversations]);

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    if (question.trim()) {
      setIsQuestionSubmitted(true);

      const personaIds = displayedPersonas.map((persona) => persona.id);
      try {
        const response = await API.post('/api/ask-multi/', {
          persona_ids: personaIds,
          question,
        });
        const { responses } = response.data;

        const newConversations = responses.map((resp) => ({
          question: resp.question,
          response: resp.response,
          persona_id: resp.persona_id,
          multi_chat_id: resp.multi_chat_id,
        }));

        setConversations((prev) => [...prev, ...newConversations]);
        setQuestion('');
      } catch (error) {
        console.error('Failed to submit question:', error);
      }
    }
  };

  return (
    <div className="persona-list-container">
      <h2>aiVillage Chat</h2>
      <div className="persona-list">
        {displayedPersonas.map((persona) => {
          const personaConversations = conversations.filter(
            (conv) => String(conv.persona_id) === String(persona.id)
          );

          return (
            <LandingPersonaCard
              key={persona.id}
              persona={persona}
              onSelect={onSelectPersonas}
              conversations={personaConversations}
              isQuestionSubmitted={isQuestionSubmitted}
              maxHeights={maxHeights}
            />
          );
        })}
      </div>

      <div className="question-container">
        <div className="question-text-area">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask your question here!"
          ></textarea>
        </div>
        <button
          className="question-submit-button"
          onClick={handleQuestionSubmit}
        >
          ?
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
