export async function POST(request) {
  try {
    const { promptType } = await request.json();
    let promptText;

    switch (promptType) {
      case 'promptOne':
        promptText = 'Your text for prompt 1';
        break;
      case 'promptTwo':
        promptText = 'Your text for prompt 2';
        break;
      case 'promptThree':
        promptText = 'Your text for prompt 3';
        break;
      default:
        promptText = 'Default prompt text';
    }

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

    return new Response(JSON.stringify({ completion: responseBody.choices[0].message.content.trim() }), {
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