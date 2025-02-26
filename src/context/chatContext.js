/** @format */
import { createContext, useContext, useState, useEffect } from "react";
import {
  fetchConversations,
  fetchMessages,
  sendMessage,
} from "../services/chatService";
const ChatContext = createContext();

export const ChatProvider = ({ children, user }) => {
  const [conversations, setConversations] = useState([]);
  const [activeThread, setActiveThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = user?._id;

  useEffect(() => {
    if (!userId) return;
    const unsubscribe = fetchConversations(userId, setConversations);
    return () => unsubscribe();
  }, [userId]);

  useEffect(() => {
    if (!activeThread?._id) return;
    const unsubscribe = fetchMessages(activeThread?._id, setMessages);
    return () => unsubscribe();
  }, [activeThread?._id]);

  const sendMessageToUser = async (text) => {
    if (!userId || !activeThread?.otherUser) return;
    setLoading(true);
    try {
      await sendMessage(userId, activeThread.otherUser._id, text);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeThread,
        setActiveThread,
        messages,
        sendMessageToUser,
        loading,
        error,
      }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
