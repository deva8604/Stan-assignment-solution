# STAN Chatbot

A modern AI-powered conversational chatbot built with Node.js, Express, and React. Features tone detection and conversation memory using Google's Gemini API.

## Features

- 🤖 **AI-Powered Responses**: Uses Google Gemini API for intelligent conversations
- 🎭 **Tone Detection**: Automatically detects user's emotional tone and responds accordingly
- 💾 **Conversation Memory**: Remembers previous conversations for context-aware responses
- 🎨 **Modern UI**: Beautiful, responsive React frontend with real-time chat interface
- ⚡ **Real-time Communication**: Instant message exchange with loading states
- 🔒 **Error Handling**: Robust error handling for API failures and network issues

## Project Structure

```
stan/
├── server/                 # Backend Express server
│   ├── index.js           # Main server file
│   ├── package.json       # Backend dependencies
│   ├── env.example        # Environment variables template
│   ├── services/          # Business logic services
│   │   ├── chatbot.js     # Chatbot response generation
│   │   ├── memory.js      # Conversation memory management
│   │   └── tone.js        # Tone detection service
│   └── utils/             # Utility functions
│       └── llm.js         # LLM API integration
└── FE/
    ├──chatUi/             # Frontend React application
        ├── public/            # Static files
        ├── src/               # React source code
        │   ├── App.js         # Main React component
        │   ├── App.css        # Component styles
        │   ├── index.js       # React entry point
        │   └── index.css      # Global styles
        └── package.json       # Frontend dependencies
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key

## Setup Instructions

### 1. Clone and Navigate to Project

```bash
cd stan
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp env.example .env

# Edit .env file and add your Gemini API key
# GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Frontend Setup

```bash
# Navigate to chat-ui directory
cd ../chat-ui

# Install dependencies
npm install
```

### 4. Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key and add it to your `server/.env` file

### 5. Run the Application

#### Terminal 1 - Start Backend Server
```bash
cd server
npm start
# Server will run on http://localhost:4000
```

#### Terminal 2 - Start Frontend
```bash
cd chat-ui
npm start
# React app will run on http://localhost:3000
```

## API Endpoints

### POST /chat
Send a message to the chatbot.

**Request Body:**
```json
{
  "userId": "user123",
  "message": "Hello, how are you?"
}
```

**Response:**
```json
{
  "reply": "Hello! I'm doing great, thank you for asking! How can I help you today?"
}
```

### GET /health
Check server health status.

**Response:**
```json
{
  "status": "OK",
  "message": "STAN Chatbot Server is running"
}
```

## Technologies Used

### Backend
- **Express.js**: Web framework for Node.js
- **CORS**: Cross-origin resource sharing
- **Axios**: HTTP client for API calls
- **dotenv**: Environment variable management

### Frontend
- **React**: JavaScript library for building user interfaces
- **Axios**: HTTP client for API communication
- **CSS3**: Modern styling with gradients and animations

### AI/ML
- **Google Gemini API**: Large language model for conversation generation
- **Tone Detection**: Emotional analysis of user messages

## Development

### Backend Development
```bash
cd server
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd chat-ui
npm start    # Starts development server with hot reload
```

## Environment Variables

Create a `.env` file in the `server` directory:

```env
# Required
GEMINI_API_KEY=your_gemini_api_key_here

# Optional
PORT=4000
```

## Features in Detail

### Tone Detection
The chatbot analyzes the emotional tone of user messages and adjusts its response style accordingly:
- **Happy**: Upbeat and enthusiastic responses
- **Sad**: Empathetic and supportive responses
- **Angry**: Calm and understanding responses
- **Neutral**: Balanced and informative responses
- **Excited**: Energetic and engaging responses

### Conversation Memory
The system maintains conversation history for each user, allowing for context-aware responses that reference previous interactions.

### Error Handling
- Graceful handling of API failures
- User-friendly error messages
- Automatic fallback responses
- Network error recovery

