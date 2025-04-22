/** @format */

import { chatService } from "@/services/chat.service";
import { createContext, useContext, useState, useEffect } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children, user }) => {
  const [conversations, setConversations] = useState([]);
  const [activeThread, setActiveThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const userId = user?._id;
  useEffect(() => {
    if (!userId) return;

    let unsubscribe;

    const fetchData = async () => {
      unsubscribe = await chatService.fetchConversations(
        userId,
        setConversations
      );
    };

    fetchData();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [userId]);

  useEffect(() => {
    if (!activeThread?._id) return;
    let unsubscribe;
    const fetchData = async () => {
      unsubscribe = await chatService.fetchMessages(
        activeThread._id,
        setMessages
      );
    };
    fetchData();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [activeThread?._id]);

  const sendMessageToUser = async (text, imageUrl = null) => {
    if (!userId || !activeThread?.otherUser) return;
    setLoading(true);
    try {
      await chatService.sendMessage(
        userId,
        activeThread.otherUser._id,
        text,
        imageUrl
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessageForUser = async (messageId, deleteForEveryone = false) => {
    if (!activeThread?._id || !messageId) return;
    setLoading(true);
    try {
      await chatService.deleteMessage(
        activeThread._id,
        messageId,
        deleteForEveryone
      );
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
        deleteMessageForUser,
        loading,
        error,
        newMessage,
        setNewMessage,
        imagePreview,
        setImagePreview,
      }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
