/** @format */
"use client";
import ChatWindow from "@/components/Chat/ChatWindow";
import ConversationList from "@/components/Chat/ConversationList";
import React from "react";
import { useChat } from "@/context/chatContext";

const Chat = () => {
  const { activeThread } = useChat();

  return (
    <div className='flex h-screen'>
      {/* Large Screens: Show both */}
      <div className='hidden md:flex w-full'>
        <ConversationList />
        <div className='flex-1'>
          <ChatWindow />
        </div>
      </div>

      {/* Small Screens: Conditional Rendering */}
      <div className='flex md:hidden w-full'>
        {!activeThread ? <ConversationList /> : <ChatWindow />}
      </div>
    </div>
  );
};

export default Chat;
