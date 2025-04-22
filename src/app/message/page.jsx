/** @format */

"use client";
import ChatWindow from "@/components/Chat/ChatWindow";
import ConversationList from "@/components/Chat/ConversationList";
import React, { useEffect } from "react";
import { useChat } from "@/context/chat.context";
import { useSearchParams } from "next/navigation";

const Chat = () => {
  const { setActiveThread, activeThread, conversations, setNewMessage } =
    useChat();
  const searchParams = useSearchParams();
  const threadId = searchParams.get("threadId");
  const postId = searchParams.get("postId");
  useEffect(() => {
    if (postId) {
      const postLink = `https://insta-pk.vercel.app/p/${postId}`;
      setNewMessage(postLink);
    }
  }, [postId]);
  useEffect(() => {
    if (threadId) {
      if (!activeThread) {
        const thread = conversations?.find((c) => c._id === threadId);
        if (thread) setActiveThread(thread);
      }
    } else {
      setActiveThread(null);
    }
  }, [threadId, conversations]);

  return (
    <div className='flex h-screen'>
      {/* Desktop */}
      <div className='hidden md:flex w-full'>
        <ConversationList />
        <div className='flex-1'>
          <ChatWindow />
        </div>
      </div>

      {/* Mobile */}
      <div className='flex md:hidden w-full'>
        {!threadId ? <ConversationList /> : <ChatWindow />}
      </div>
    </div>
  );
};

export default Chat;
