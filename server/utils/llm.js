const axios = require('axios');
require('dotenv').config();

async function callLLM(prompt) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY not found');
      return 'Sorry, the AI service is not configured. Please check your API key.';
    }

    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          key: process.env.GEMINI_API_KEY
        }
      }
    );

    if (!response.data.candidates || !response.data.candidates[0]) {
      console.warn('Invalid response from Gemini API');
      return 'Sorry, I received an invalid response. Please try again.';
    }

    const candidate = response.data.candidates[0];
    return candidate.content.parts[0].text;
  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 400) {
      return 'Sorry, there was an issue with the request. Please try again.';
    } else if (error.response?.status === 401) {
      return 'Sorry, the AI service is not properly configured. Please check your API key.';
    } else if (error.response?.status === 429) {
      return 'Sorry, the AI service is currently busy. Please try again in a moment.';
    }
    
    return 'Sorry, something went wrong. Please try again.';
  }
}

module.exports = { callLLM }; 