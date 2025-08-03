import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentMessageId, setCurrentMessageId] = useState(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    const userMessage = input;
    setInput('');
    
    // Create a unique ID for this message
    const messageId = Date.now() + Math.random();
    setCurrentMessageId(messageId);
    
    // Add user message immediately
    setMessages(prev => [...prev, { user: userMessage, bot: null, id: messageId }]);
    
    try {
      const res = await axios.post('http://localhost:4000/chat', {
        userId: 'user123',
        message: userMessage
      });
      
      // Update the last message with bot response
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, bot: res.data.reply } : msg
        )
      );
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, bot: 'Sorry, something went wrong. Please try again.' } : msg
        )
      );
    } finally {
      setIsLoading(false);
      setCurrentMessageId(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="app">
      <div className="chat-container">
        <header className="chat-header">
          <h1>🤖 STAN Chatbot</h1>
          <p>Your AI-powered conversational assistant</p>
        </header>
        
        <div className="messages-container">
          {messages.length === 0 && (
            <div className="welcome-message">
              <p>👋 Hello! I'm STAN, your AI assistant. How can I help you today?</p>
            </div>
          )}
          
          {messages.map((message, index) => (
            <div key={message.id || index} className="message-group">
              <div className="message user-message">
                <div className="message-content">
                  <strong>You:</strong> {message.user}
                </div>
              </div>
              
              {message.bot && (
                <div className="message bot-message">
                  <div className="message-content">
                    <strong>STAN:</strong> {message.bot}
                  </div>
                </div>
              )}
              
              {!message.bot && isLoading && message.id === currentMessageId && (
                <div className="message bot-message">
                  <div className="message-content">
                    <strong>STAN:</strong> <span className="typing">Typing...</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            disabled={isLoading}
            className="message-input"
          />
          <button 
            onClick={sendMessage} 
            disabled={isLoading || !input.trim()}
            className="send-button"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App; 