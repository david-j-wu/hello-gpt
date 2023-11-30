"use client"

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="container mt-5">
      <h1 className="mb-4">Choose Linguistics Topics for Personalized Learning Path</h1>
      <div className="d-flex flex-wrap mb-3">
        {topics.map(topic => (
          <button
            key={topic}
            onClick={() => toggleTopic(topic)}
            className={`btn ${selectedTopics.includes(topic) ? 'btn-success' : 'btn-outline-secondary'} m-2`}
          >
            {topic}
          </button>
        ))}
      </div>
      <button className="btn btn-primary" onClick={sendRequest}>Get Learning Path</button>

      {isLoading && <div className="mt-3"><p className="text-info">Loading...</p></div>}
      {response && <div className="mt-3 alert alert-info">{response}</div>}
    </div>
  );
}
