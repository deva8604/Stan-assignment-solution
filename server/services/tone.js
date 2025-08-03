const axios = require('axios');
require('dotenv').config();

async function detectTone(message) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY not found, using neutral tone');
      return 'neutral';
    }

    const prompt = `Analyze the emotional tone of the following message and respond with one word: happy, sad, angry, neutral, excited, etc.\nMessage: "${message}"`;
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
      return 'neutral';
    }
    
    const candidate = response.data.candidates[0];
    return candidate.content.parts[0].text.trim().toLowerCase();
  } catch (error) {
    console.error('Tone detection error:', error.response?.data || error.message);
    return 'neutral';
  }
}

module.exports = { detectTone }; 