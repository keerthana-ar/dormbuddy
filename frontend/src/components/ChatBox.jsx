import { useState } from "react";
import axios from "axios";

export default function ChatBox({ mode }) {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setChat([...chat, userMsg]);

    try {
      const res = await axios.post("http://localhost:8000/chat", {
        message: input,
        mode,
      });
      const botMsg = { role: "bot", content: res.data.response };
      setChat(prev => [...prev, userMsg, botMsg]);
      setInput("");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-4 rounded-xl shadow-xl">
      <div className="h-80 overflow-y-scroll space-y-3 mb-4">
        {chat.map((msg, i) => (
          <div key={i} className={`text-${msg.role === "user" ? "right" : "left"}`}>
            <p className={`p-2 rounded-md ${msg.role === "user" ? "bg-pink-200" : "bg-purple-100"}`}>
              {msg.content}
            </p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded-md p-2"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage} className="bg-purple-600 text-white px-4 rounded-md">
          Send
        </button>
      </div>
    </div>
  );
}
