/** @format */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useFirebase } from "../../context/FirebaseContext";

const ChatPage = () => {
  const { chatId } = useRouter().query; // Get the chatId from the URL
  const { user, loading, messages, setCurrentChatId, sendMessage } =
    useFirebase();
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (chatId) {
      setCurrentChatId(chatId); // Set the current chat ID when chatId changes
    }
  }, [chatId, setCurrentChatId]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      await sendMessage(chatId, newMessage); // Send the new message
      setNewMessage(""); // Clear the message input
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Chat with {chatId}</h2>
      <div
        style={{
          maxHeight: "400px",
          overflowY: "scroll",
          marginBottom: "10px",
        }}>
        {/* Display messages */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              padding: "5px",
              marginBottom: "8px",
              borderBottom: "1px solid #ccc",
            }}>
            <strong>{msg.senderId === user?.uid ? "You" : "User"}</strong>:{" "}
            {msg.message}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <input
          type='text'
          placeholder='Type a message...'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{ flex: 1, marginRight: "10px" }}
        />
        <button
          onClick={handleSendMessage}
          style={{ padding: "8px 16px" }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
