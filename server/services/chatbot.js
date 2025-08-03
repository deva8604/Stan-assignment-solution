const { callLLM } = require('../utils/llm');
const { getUserMemory, saveUserMemory } = require('./memory');

async function getReply(message, memory, tone) {
  const prompt = `You are a friendly chatbot. Use an emotionally ${tone} tone. Past context: ${memory}. User: ${message}`;
  return await callLLM(prompt);
}

async function updateUserMemory(userId, message, reply) {
  const current = await getUserMemory(userId);
  const updated = `${current}\nUser: ${message}\nBot: ${reply}`;
  await saveUserMemory(userId, updated);
}

module.exports = { getReply, updateUserMemory }; 