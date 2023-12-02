"use client"

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './page.css';

export default function Home() {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeCircle, setActiveCircle] = useState(null);
  const [modalContent, setModalContent] = useState(null);

  const topics = [
    'Introduction to Language', 'Phonetics', 'Phonology', 'Morphology', 'Syntax', 'Semantics', 'Pragmatics', 'Language Families'
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

  const renderTopicsInCircles = (output) => {
    const topics = output.split(/\d+\./).filter(Boolean);
    return topics.map((topic, index) => (
      <div
        key={index}
        className="circle-topic"
        onClick={() => handleCircleClick(topic, index)}
      >
        <h5>Topic {index + 1}</h5>
      </div>
    ));
  };

  const handleCircleClick = (topicContent, index) => {
    setModalContent({ index, content: topicContent });
    setActiveCircle(index); // Set the index of the clicked circle as active
  };

  const closeModal = () => {
    setActiveCircle(null);
    setModalContent(null);
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
          <div className={`overlay ${activeCircle !== null ? 'active' : ''}`} onClick={closeModal}></div>
          <div className="topics-container d-flex flex-wrap justify-content-center">
            {response && renderTopicsInCircles(response)}
          </div>
        </div>
      )}

      {modalContent && (
        <div className={`modal-container ${activeCircle !== null ? 'active' : ''}`}>
          <div className="modal-content">
            <h5>Topic {modalContent.index + 1}</h5>
            <p>{modalContent.content}</p>
            <button className="btn btn-secondary" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

      <div className={`overlay ${activeCircle !== null ? 'active' : ''}`} onClick={closeModal}></div>
    </div>
  );
}