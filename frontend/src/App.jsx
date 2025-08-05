import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ChatBubble from "./components/ChatBubble";
import Header from "./components/Header";
import ModeSelector from "./components/ModeSelector";

const App = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hey! I'm DormBuddy 👋 Your AI college sidekick. Pick a vibe and let's chat!",
      sender: "bot"
    }
  ]);
  const [input, setInput] = useState("");
  const [personality, setPersonality] = useState("roomie");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:8000/chat", {
        message: currentInput,
        personality: personality,
      });

      // Fixed: Use the correct response structure from your backend
      const reply = res.data.reply;
      setMessages((prev) => [...prev, { text: reply, sender: "bot" }]);
    } catch (err) {
      console.error("Chat error:", err);
      setError("Oops! Something went wrong. Try again? 🤔");
      setMessages((prev) => [...prev, { 
        text: "Sorry, I'm having trouble connecting right now. Try again in a sec! 😅", 
        sender: "bot" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 p-4">
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <Header />
        
        {/* Mode Selector */}
        <ModeSelector mode={personality} setMode={setPersonality} />
        
        {/* Chat Container */}
        <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 flex flex-col min-h-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent">
            {messages.map((msg, i) => (
              <ChatBubble key={i} text={msg.text} sender={msg.sender} />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl px-4 py-3 max-w-sm">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-sm">DormBuddy is typing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Input Area */}
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full p-4 pr-12 rounded-2xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none resize-none max-h-32 bg-white/80 backdrop-blur-sm placeholder-gray-500"
                placeholder="Type your message... (Press Enter to send)"
                rows="1"
                disabled={isLoading}
                style={{
                  minHeight: '56px',
                  scrollbarWidth: 'thin',
                }}
              />
              <div className="absolute right-3 bottom-3 text-gray-400 text-xs">
                {input.length}/500
              </div>
            </div>
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 text-white p-4 rounded-2xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;