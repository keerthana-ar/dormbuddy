const ChatBubble = ({ text, sender }) => {
  const isUser = sender === "user";
  return (
    <div className={`my-2 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`rounded-2xl px-4 py-2 max-w-sm text-white ${isUser ? "bg-purple-500" : "bg-gray-800"}`}>
        {text}
      </div>
    </div>
  );
};

export default ChatBubble;
