"use client";

import React, { useState } from 'react';

export default function Home() {
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = async (promptType) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/hello', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ promptType }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setResponse(data.completion);
    } catch (error) {
      setResponse(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <button onClick={() => sendRequest('promptOne')}>Prompt 1</button>
      <button onClick={() => sendRequest('promptTwo')}>Prompt 2</button>
      <button onClick={() => sendRequest('promptThree')}>Prompt 3</button>

      {isLoading && <p>Loading...</p>}
      {response && <p>{response}</p>}
    </div>
  );
}
