const memoryStore = {}; // In-memory for demo (use Redis in prod)
const MAX_MEMORY_SIZE = 10000; // Limit memory size to prevent memory leaks

async function getUserMemory(userId) {
  return memoryStore[userId] || '';
}

async function saveUserMemory(userId, data) {
  // Limit memory size to prevent memory leaks
  if (data.length > MAX_MEMORY_SIZE) {
    // Keep only the last part of the conversation
    const lines = data.split('\n');
    const recentLines = lines.slice(-50); // Keep last 50 lines
    data = recentLines.join('\n');
  }
  
  memoryStore[userId] = data;
}

// Clean up old memories periodically (optional)
function cleanupOldMemories() {
  const now = Date.now();
  const MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours
  
  // This is a simple cleanup - in production, use Redis with TTL
  Object.keys(memoryStore).forEach(userId => {
    if (memoryStore[userId]._timestamp && (now - memoryStore[userId]._timestamp) > MAX_AGE) {
      delete memoryStore[userId];
    }
  });
}

module.exports = { getUserMemory, saveUserMemory }; 