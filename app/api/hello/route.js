import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const { topics, userInput, apiCallCount } = await request.json();
    const dataDir = path.join(process.cwd(), 'app', 'data');
    
    // Read all selected topic files
    const topicContents = await Promise.all(
      topics.map(async (topic) => {
        const filePath = path.join(dataDir, `${topic.toLowerCase()}.txt`);
        try {
          return await fs.readFile(filePath, 'utf8');
        } catch (error) {
          console.error(`Error reading file: ${filePath}`, error);
          return ''; // Return empty string if file not found or error reading
        }
      })
    );
    
    const combinedContents = topicContents.join('\n\n');
    let promptText;

    if (apiCallCount === 1) {
      promptText = `Do the following four steps:
      Step 1) Write me a summary of the following content
      Step 2) Create vocabulary-matching activity with four words and a bank of their definitions
      Step 3) Create a review quiz with four questions, starting with "Here is a review quiz of the content" Make it multiple choice for each question and start each possible answer with a), b), c), or d)
      Step 4) Provide a brief answer key to the vocabulary and review quiz. Don't give any notes

      Segment each step with the word "StepMarker", and use the following content as reference:
      \n\n${combinedContents}`;
    } else {
      promptText = `Do the following four steps:
      Step 1) Write me a summary of the following content
      Step 2) Create vocabulary-matching activity with four words and a bank of their definitions
      Step 3) Create a review quiz with four questions, starting with "Here is a review quiz of the content"
      Step 4) Provide a brief answer key to the vocabulary and review quiz. Don't give any notes
    
      Segment each step with the word "StepMarker", and tailor the content to focus on "${userInput}" within
      the subject of ${topics}`;
    }

    // OpenAI API request setup
    const createChatCompletionEndpointURL = "https://api.openai.com/v1/chat/completions";
    const createChatCompletionReqParams = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: promptText }],
    };

    const response = await fetch(createChatCompletionEndpointURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(createChatCompletionReqParams),
    });

    const responseBody = await response.json();

    if (!response.ok) {
      throw new Error(`OpenAI API Error: ${response.status}`);
    }

    return new Response(JSON.stringify({ recommendation: responseBody.choices[0].message.content.trim() }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: { message: error.message || "An error occurred" } }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}