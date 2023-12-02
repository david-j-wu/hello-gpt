import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const { topics } = await request.json();
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
    const promptText = `Based on the following contents, create a personalized learning path. 
    This means that for each step, provide a summary of the content, then suggest what to do to
    review it.
    Segment it so that each new step is denoted by the word "StepMarker":
    
    \n\n${combinedContents}`;

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