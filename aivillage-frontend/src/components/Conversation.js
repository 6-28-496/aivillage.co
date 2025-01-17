import React, { useState, useEffect } from 'react';
import API from '../api';

const Conversation = ({ selectedPersonas }) => {
  const [conversations, setConversations] = useState([]);
  const [question, setQuestion] = useState('');
  const [error, setError] = useState('');
  const [multiChatId, setMultiChatId] = useState('');

  useEffect(() => {
    if (selectedPersonas.length > 0) {
      // Generate a unique multi_chat_id based on selected persona IDs
      const personaIds = selectedPersonas.map(persona => persona.id).sort();
      const newMultiChatId = personaIds.join('-');

      // Update multi_chat_id state to track new selection
      setMultiChatId(newMultiChatId);

      // Fetch conversations for this specific multi_chat_id
      API.get(`/api/conversations/`, { params: { persona_ids: personaIds } })
        .then(response => setConversations(response.data))
        .catch(error => {
          console.error(error);
          setError('Failed to load conversations.');
        });
    } else {
      // Reset conversations if no personas are selected
      setConversations([]);
      setMultiChatId('');
    }
  }, [selectedPersonas]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const personaIds = selectedPersonas.map(persona => persona.id);
    
    API.post('/api/ask-multi/', { persona_ids: personaIds, question })
      .then(response => {
        const { responses, multi_chat_id } = response.data;
        
        // Map responses to conversations and store by multi_chat_id
        const newConversations = responses.map(resp => ({
          question: resp.question,
          response: resp.response,
          persona_name: resp.persona,
          multi_chat_id: multi_chat_id
        }));
        
        // Append new conversations to current state
        setConversations(prevConversations => [...prevConversations, ...newConversations]);
        setQuestion('');
      })
      .catch(error => {
        console.error(error);
        setError('Failed to send question.');
      });
  };

  return (
    <div className="conversation-container">
      <h2>Conversation</h2>
      {conversations.length === 0 ? (
        <p>No conversation history yet.</p>
      ) : (
        <ul>
          {Object.entries(
            conversations.reduce((acc, conv) => {
              const { multi_chat_id } = conv;
              if (!acc[multi_chat_id]) acc[multi_chat_id] = [];
              acc[multi_chat_id].push(conv);
              return acc;
            }, {})
          ).map(([multiChatId, groupedConversations]) => (
            <li key={multiChatId} className="multi-chat-group">
              <h3>Multi-Chat Session</h3>

              {/* Group responses by each unique question within this multi-chat session */}
              {groupedConversations.reduce((acc, conv, idx, array) => {
                // If this is the first occurrence of a question or if the question differs from the previous one
                if (idx === 0 || conv.question !== array[idx - 1].question) {
                  acc.push(
                    <p key={`question-${idx}`}><strong>Question:</strong> {conv.question}</p>
                  );
                }

                // Add each persona's response under the current question
                acc.push(
                  <div key={`response-${idx}`} className="conversation-item">
                    <strong>{conv.persona_name}:</strong> {conv.response}
                  </div>
                );

                return acc;
              }, [])}
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <textarea
          className="large-textarea"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
          required
        />
        <button type="submit" className="conversation-submit-button" disabled={selectedPersonas.length === 0}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Conversation;
