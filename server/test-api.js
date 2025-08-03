const axios = require('axios');
require('dotenv').config();

async function testGeminiAPI() {
  console.log('🔍 Testing Gemini API...');
  
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY not found in environment variables');
    console.log('Please add your API key to server/.env file');
    return;
  }
  
  console.log('✅ API Key found');
  
  const models = [
    'gemini-1.5-pro',
    'gemini-1.5-flash', 
    'gemini-1.0-pro',
    'gemini-pro'
  ];
  
  for (const model of models) {
    try {
      console.log(`\n🧪 Testing model: ${model}`);
      
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent`,
        {
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: 'Hello, this is a test message.'
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
      
      console.log(`✅ ${model} - SUCCESS!`);
      console.log(`Response: ${response.data.candidates[0].content.parts[0].text}`);
      return model; // Use this working model
      
    } catch (error) {
      console.log(`❌ ${model} - FAILED: ${error.response?.data?.error?.message || error.message}`);
    }
  }
  
  console.log('\n❌ No working models found. Please check your API key and permissions.');
}

testGeminiAPI(); 