#!/bin/bash

echo "🚀 Setting up STAN Chatbot..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js is installed"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp env.example .env
    echo "⚠️  Please edit server/.env and add your Gemini API key"
    echo "   Get your API key from: https://makersuite.google.com/app/apikey"
fi

cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd chat-ui
npm install
cd ..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit server/.env and add your Gemini API key"
echo "2. Run 'npm start' to start both servers"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "Or run 'npm run dev' for development mode with auto-restart" 