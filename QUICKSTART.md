# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Setup (One-time)
```bash
# Run the automated setup script
./setup.sh

# Or manually:
npm run install-all
```

### 2. Configure API Key
```bash
# Edit the environment file
nano server/.env

# Add your Gemini API key:
GEMINI_API_KEY=your_actual_api_key_here
```

**Get your API key from:** [Google AI Studio](https://makersuite.google.com/app/apikey)

### 3. Start the Application
```bash
# Start both servers
npm start

# Or for development with auto-restart:
npm run dev
```

## 🌐 Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:4000
- **Health Check:** http://localhost:4000/health

## 🧪 Test the Chatbot

1. Open http://localhost:3000 in your browser
2. Type a message and press Enter
3. The chatbot will respond with tone-aware messages

## 🔧 Troubleshooting

### Common Issues:

**"Module not found" errors:**
```bash
# Reinstall dependencies
npm run install-all
```

**"API key not found" errors:**
- Make sure you've added your Gemini API key to `server/.env`
- Restart the server after adding the key

**Port already in use:**
```bash
# Kill processes on ports 3000 and 4000
lsof -ti:3000 | xargs kill -9
lsof -ti:4000 | xargs kill -9
```

**CORS errors:**
- Make sure both servers are running
- Check that the frontend is calling the correct backend URL

## 📁 Project Structure Quick Reference

```
stan/
├── server/          # Backend (Express + Gemini API)
├── chat-ui/         # Frontend (React)
├── setup.sh         # Automated setup script
├── package.json     # Root scripts
└── README.md        # Full documentation
```

## 🎯 Next Steps

- Customize the chatbot personality in `server/services/chatbot.js`
- Add more tone detection categories in `server/services/tone.js`
- Enhance the UI in `chat-ui/src/App.css`
- Add database persistence for conversation memory 