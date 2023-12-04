"use client"

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap';
import './page.css';

export default function Home() {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeCircle, setActiveCircle] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [apiCallCount, setApiCallCount] = useState(0);
  const [userName, setUserName] = useState('');
  const [isNameEntered, setIsNameEntered] = useState(false);

  const topics = [
    'Introduction to Language', 'Phonetics', 'Phonology', 'Morphology', 'Syntax', 'Semantics', 'Pragmatics', 'Language Families'
  ];

  const handleNameSubmit = () => {
    if (userName) {
      setIsNameEntered(true);
    } else {
      alert("Please enter your name.");
    }
  };

  if (!isNameEntered) {
    return (
      <div className="welcome-container">
        <h1>Welcome to Lingua!</h1>
        <p>Learn about linguistics in an interactive way.</p>
        <input
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button onClick={handleNameSubmit}>Get Started</button>
      </div>
    );
  }

  const toggleTopic = (topic) => {
    setSelectedTopics(prev => 
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
    setApiCallCount(1);
  };

  const sendRequest = async () => {
    setIsLoading(true);
    setApiCallCount(apiCallCount => apiCallCount + 1);
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

  const handleUserInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleChatSubmit = async () => {
    setIsLoading(true);
    setApiCallCount(apiCallCount => apiCallCount + 1);
    try {
      // Send both the selected topic and the user's input to the backend
      const response = await fetch('/api/hello', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topics: selectedTopics, userInput }),
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
    // Split the output based on "StepMarker" and filter out empty strings
    const topics = output.split(/StepMarker/).filter(Boolean);
  
    return topics.map((topic, index) => (
      <div
        key={index}
        className="circle-topic"
        onClick={() => handleCircleClick(topic.trim(), index)}
      >
        <h5>Topic {index + 1}</h5>
      </div>
    ));
  };

  const handleCircleClick = (topicContent, index) => {
    // Process the content into a quiz format
    const quizContent = formatQuizContent(topicContent);
    setModalContent({ index, content: quizContent });
    setActiveCircle(index); // Set the index of the clicked circle as active
  };

  // Helper function to format the quiz content
  const formatQuizContent = (content) => {
    // Here, you'd parse the content and structure it into quiz format.
    // The example below assumes you have a specific format for the content.
    const sections = content.split('\n').filter(line => line.trim() !== '');
    const words = sections.slice(0, 4); // Assuming the first 4 lines are words
    const definitions = sections.slice(4); // Assuming the rest are definitions

    // Create quiz elements
    // const wordButtons = words.map((word, index) => (
    //   <button key={index} className="btn btn-info m-2">{word}</button>
    // ));

    const definitionList = definitions.map((definition, index) => (
      <li key={index} className="list-group-item">{definition}</li>
    ));

    return {definitionList };
  };

  const closeModal = () => {
    setActiveCircle(null);
    setModalContent(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Hi {userName}, what would you like to learn today?</h1>
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
            <div className={`modal fade ${activeCircle !== null ? 'show d-block' : ''}`} tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Topic {modalContent.index + 1}</h5>
                    <button 
                      type="button" 
                      className="btn-close" 
                      aria-label="Close" 
                      onClick={closeModal}  // Ensure this button calls closeModal
                    ></button>
                  </div>
                  <div className="modal-body">
                {/* Display word buttons */}
                <div className="d-flex flex-wrap justify-content-center">
                  {modalContent.content.wordButtons}
                </div>
                {/* Display definitions */}
                <ul className="list-group list-group-flush">
                  {modalContent.content.definitionList}
                </ul>
                </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={closeModal}  // Ensure this button also calls closeModal
              >Close</button>
            </div>
          </div>
        </div>
      </div>
      )}

      {response && (
      <div className="chat-box">
        <input
          type="text"
          value={userInput}
          onChange={handleUserInputChange}
          placeholder="What do you want to practice more of?"
        />
        <button onClick={handleChatSubmit}>Submit</button>
      </div>
      )}

      <div className={`overlay ${activeCircle !== null ? 'active' : ''}`} onClick={closeModal}></div>
    </div>
  );
}