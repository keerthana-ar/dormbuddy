import React, { useState } from "react";
import axios from "axios";
import ChatBubble from "./components/ChatBubble";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [personality, setPersonality] = useState("Chill Roomie");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:8000/chat", {
        message: input,
        personality: personality,
      });

      const reply = res.data.choices[0].message.content;
      setMessages((prev) => [...prev, { text: reply, sender: "bot" }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { text: "Network error 😥", sender: "bot" }]);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto flex flex-col min-h-screen">
      <h1 className="text-4xl font-bold text-center my-4 text-purple-600">DormBuddy</h1>
      <select
        className="mb-4 p-2 rounded-lg border border-purple-400"
        value={personality}
        onChange={(e) => setPersonality(e.target.value)}
      >
        <option>Professor</option>
        <option>Chill Roomie</option>
        <option>Therapist Bro</option>
      </select>

      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, i) => (
          <ChatBubble key={i} text={msg.text} sender={msg.sender} />
        ))}
      </div>

      <div className="flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 rounded-l-lg border border-purple-400"
          placeholder="Talk to DormBuddy..."
        />
        <button onClick={sendMessage} className="bg-purple-500 text-white px-4 rounded-r-lg">
          Send
        </button>
      </div>
    </div>
  );
};

export default App;
