/** @format */
"use client";
import ChatWindow from "@/components/Chat/ChatWindow";
import ConversationList from "@/components/Chat/ConversationList";
import React from "react";

const Chat = () => {
  return (
    <div className='flex'>
      {/* Sidebar */}
      <ConversationList />
      {/* Chat Window */}
      <ChatWindow />
    </div>
  );
};

export default Chat;
