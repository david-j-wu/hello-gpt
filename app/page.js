"use client"

import React, { useState } from 'react';

export default function Home() {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const topics = [
    'Phonetics', 'Phonology', 'Morphology', 'Syntax', 'Semantics', 'Pragmatics', 'Sociolinguistics'
  ];

  const toggleTopic = (topic) => {
    setSelectedTopics(prev => 
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const sendRequest = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/hello', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topics: selectedTopics }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setResponse(data.recommendation);
    } catch (error) {
      setResponse(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Choose Linguistics Topics for Personalized Learning Path</h1>
      <div>
        {topics.map(topic => (
          <button key={topic} onClick={() => toggleTopic(topic)} className={selectedTopics.includes(topic) ? 'selected' : ''}>
            {topic}
          </button>
        ))}
      </div>
      <button onClick={sendRequest}>Get Learning Path</button>

      {isLoading && <p>Loading...</p>}
      {response && <p>{response}</p>}
    </div>
  );
}
