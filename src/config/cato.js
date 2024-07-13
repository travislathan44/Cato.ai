import axios from 'axios';

// API key and model name for the OpenAI API
const API_KEY = 'YOUR-API-KEY';
const MODEL_NAME = 'ft:gpt-3.5-turbo-0125:personal:cato-ai:9ZKsSCk0';

// Create an Axios instance for the OpenAI API with the base URL and headers
const openaiApi = axios.create({
    baseURL: 'https://api.openai.com/v1',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}` // Bearer token for authorization
    }
});

// Function to run the chat with the provided prompt
const runChat = async (prompt) => {
    try {
        // POST request to the OpenAI API endpoint for chat completions
        const response = await openaiApi.post('/chat/completions', {
            model: MODEL_NAME, // Model name for the request
            messages: [
                { role: 'system', content: 'Cato is a factual chatbot that talks professionally.' }, // System message for setting context
                { role: 'user', content: prompt } // User message with the prompt
            ],
            max_tokens: 4096,  // Maximum tokens for the response
            temperature: 1,    // Temperature setting for the response
            top_p: 1           // Top_p setting for the response
        });

        // Return the content of the first choice's message
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        throw error; // Throw error to be handled by the caller
    }
};

export default runChat;
