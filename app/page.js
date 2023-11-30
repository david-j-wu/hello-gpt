"use client"

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './page.css';

export default function Home() {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeCircle, setActiveCircle] = useState(null);

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

  const parseOutput = (output) => {
    // Split by numeric points followed by periods (e.g., "1.", "2.", etc.)
    const topics = output.split(/\d+\./).filter(Boolean);
    return topics.map((topic, index) => ({
      id: index + 1,
      content: topic.trim()
    }));
  };  

  const renderTopicsInCircles = (output) => {
    const topics = output.split(/\d+\./).filter(Boolean);
    return topics.map((topic, index) => (
      <div
        key={index}
        className={`circle-topic ${activeCircle === index ? 'active' : ''}`}
        onClick={() => handleCircleClick(index)}
      >
        <h5>Topic {index + 1}</h5>
        <p>{topic.trim()}</p>
      </div>
    ));
  };  

  const handleCircleClick = (index) => {
    setActiveCircle(index); // Set the index of the clicked circle as active
  };

  const handleCloseActiveCircle = () => {
    setActiveCircle(null); // Reset the active circle
  };  

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Hi [name], what would you like to learn today?</h1>
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
      {response && (
        <div className="mt-3">
          <div className="alert alert-info">Your Personalized Learning Path:</div>
          <div className={`overlay ${activeCircle !== null ? 'active' : ''}`} onClick={handleCloseActiveCircle}></div>
          <div className="topics-container d-flex flex-wrap justify-content-center">
            {response && renderTopicsInCircles(response)}
          </div>
        </div>
      )}
      <div className={`overlay ${activeCircle !== null ? 'active' : ''}`} onClick={() => setActiveCircle(null)}></div>
    </div>
  );
}
