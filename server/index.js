const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { getReply, updateUserMemory } = require('./services/chatbot');
const { getUserMemory } = require('./services/memory');
const { detectTone } = require('./services/tone');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
  try {
    const { userId, message } = req.body;
    
    if (!userId || !message) {
      return res.status(400).json({ error: 'userId and message are required' });
    }
    
    // Validate message length
    if (message.length > 1000) {
      return res.status(400).json({ error: 'Message too long. Please keep it under 1000 characters.' });
    }
    
    // Sanitize inputs
    const sanitizedUserId = String(userId).trim();
    const sanitizedMessage = String(message).trim();
    
    if (!sanitizedMessage) {
      return res.status(400).json({ error: 'Message cannot be empty' });
    }
    
    const memory = await getUserMemory(sanitizedUserId);
    const tone = await detectTone(sanitizedMessage);
    const reply = await getReply(sanitizedMessage, memory, tone);
    await updateUserMemory(sanitizedUserId, sanitizedMessage, reply);
    
    res.json({ reply });
  } catch (error) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'STAN Chatbot Server is running' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)); 