export const dynamic = "force-dynamic";

// Logic for the `/api/hello` endpoint
export async function GET() {
  try {
    // Sending a request to the OpenAI create chat completion endpoint

    // Setting parameters for our request
    const createChatCompletionEndpointURL =
      "https://api.openai.com/v1/chat/completions";
    const promptText = `Write five variations of "Hello, World!"

Start each variation on a new line. Do not include additional information.
    
Here is an example:

Hello, World!
Bonjour, Earth!
Hey, Universe!
Hola, Galaxy!
G'day, World!`;
    const createChatCompletionReqParams = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: promptText }],
    };

    // Sending our request using the Fetch API
    const createChatCompletionRes = await fetch(
      createChatCompletionEndpointURL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.OPENAI_API_KEY,
        },
        body: JSON.stringify(createChatCompletionReqParams),
      }
    );

    // Processing the response body
    const createChatCompletionResBody =
      await createChatCompletionRes.json();

    // Error handling for the OpenAI endpoint
    if (createChatCompletionRes.status !== 200) {
      let error = new Error(
        "Create chat completion request was unsuccessful."
      );
      error.statusCode = createChatCompletionRes.status;
      error.body = createChatCompletionResBody;
      throw error;
    }

    // Properties on the response body
    const completionText =
      createChatCompletionResBody.choices[0].message.content.trim();
    const usage = createChatCompletionResBody.usage;

    // Logging the results
    console.log(`Create chat completion request was successful. Results:
Completion: 

${completionText}

Token usage:
Prompt: ${usage.prompt_tokens}
Completion: ${usage.completion_tokens}
Total: ${usage.total_tokens}
`);

    // Sending a successful response for our endpoint
    return new Response(JSON.stringify({ completion: completionText }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Error handling

    // Server-side error logging
    console.log(`Thrown error: ${error.message}
Status code: ${error.statusCode}
Error: ${JSON.stringify(error.body)}
`);

    // Sending an unsuccessful response for our endpoint
    return new Response(
      JSON.stringify({ error: { message: "An error has occurred" } }),
      {
        status: error.statusCode || "500",
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
