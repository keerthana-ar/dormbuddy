const ChatBubble = ({ text, sender }) => {
  const isUser = sender === "user";
  
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-2xl shadow-lg ${
        isUser 
          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md" 
          : "bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-bl-md"
      }`}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {text}
        </p>
      </div>
    </div>
  );
};

export default ChatBubble;