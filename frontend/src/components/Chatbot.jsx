import React, { useState } from "react";
import "../Chatbot.css";
import ReactMarkdown from "react-markdown";

const Chatbot = () => {
  const [showChatbox, setShowChatbox] = useState(false);
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hi! Ask me anything related to health." }]);
  const [input, setInput] = useState("");
  const API_URL = import.meta.env.VITE_CHATBOT_BACKEND_URL;

  const toggleChatbox = () => setShowChatbox(!showChatbox);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch(`${API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_message: input }),
      });

      const data = await res.json();
      setMessages([...newMessages, { sender: "bot", text: data.bot_response }]);
    } catch (error) {
      setMessages([...newMessages, { sender: "bot", text: "Something went wrong!" }]);
    }
  };

  return (
    <div>
      <div className="chat-icon" onClick={toggleChatbox}>💬</div>

      {showChatbox && (
        <div className="chatbox">
          <div className="chat-header">Ask GenAI Doctor</div>
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-msg ${msg.sender}`}>
                {msg.sender==="bot" ?(
                     <ReactMarkdown>{msg.text}</ReactMarkdown>):(
                         <p>{msg.text}</p>                     
                )}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;



