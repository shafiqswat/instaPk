/** @format */

import { useAuth } from "@/context/AuthContext";
import {
  AudioCallIcon,
  ChatGallery,
  ChatMessageIcon,
  EmojiPickerIcon,
  GifIcon,
  HurtIcon,
  MoreInfoIcon,
  VoiceIcon,
} from "@/constants/SvgIcon";
import React, { useState, useEffect, useRef, act } from "react";
import { useChat } from "@/context/chatContext";
import { useRouter } from "next/navigation";
import { Video } from "lucide-react";

const ChatWindow = () => {
  const [newMessage, setNewMessage] = useState("");
  const { activeThread, messages, sendMessageToUser } = useChat();
  const { user } = useAuth();
  const messagesEndRef = useRef(null);
  const router = useRouter();
  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    await sendMessageToUser(newMessage);
    setNewMessage("");
  };

  if (!activeThread)
    return (
      <div className='flex flex-col w-full h-screen justify-center items-center gap-2'>
        <ChatMessageIcon />
        <h3 className='text-xl'>Your messages</h3>
        <p className='text-sm text-gray-500'>Send a message to start a chat.</p>
      </div>
    );
  return (
    <div className='flex-1 p-4 w-full h-screen flex flex-col'>
      {/* Chat Header */}
      <div className='flex items-center gap-2 border-b pb-4'>
        <img
          onClick={() => router.push(`/${activeThread.otherUser.userName}`)}
          src={activeThread.otherUser.profilePic}
          className='w-10 h-10 rounded-full cursor-pointer'
          alt='Profile'
        />
        <h3
          className='font-semibold cursor-pointer'
          onClick={() => router.push(`/${activeThread.otherUser.userName}`)}>
          {activeThread.otherUser.userName}
        </h3>
        <div className='ms-auto flex items-center gap-3'>
          <AudioCallIcon />
          <Video className='w-6 h-6 cursor-pointer' />
          <MoreInfoIcon />
        </div>
      </div>

      {/* Messages List */}
      <div className='flex-1 overflow-y-auto p-2 flex flex-col'>
        {/* user profile  */}
        <div className='mx-auto flex flex-col items-center my-4'>
          <img
            src={activeThread.otherUser.profilePic}
            alt='userPic'
            className='rounded-full w-full h-full max-w-[100px] max-h-[100px]'
          />
          <h2 className='font-semibold mt-5'>
            {activeThread.otherUser.fullName}
          </h2>
          <p className='text-gray-600'>{activeThread.otherUser.userName}</p>
          <button
            className='font-semibold text-sm bg-gray-100 px-2 py-1 rounded mt-5'
            onClick={() => router.push(`/${activeThread.otherUser.userName}`)}>
            View profile
          </button>
        </div>
        {/* Messages */}
        {messages.map((msg, index) => (
          <React.Fragment key={msg._id}>
            {/* Centered timestamp */}
            {index === 0 ||
            new Date(messages[index - 1]?.timestamp).toDateString() !==
              new Date(msg.timestamp).toDateString() ? (
              <div className='text-center text-gray-500 font-semibold text-xs my-2'>
                {new Date(msg.timestamp).toDateString()}
              </div>
            ) : null}

            {/* Message Bubble */}
            <div
              className={`flex items-end ${
                msg.sender === user._id ? "justify-end" : "justify-start"
              }`}>
              {msg.sender !== user._id && (
                <img
                  src={activeThread.otherUser.profilePic}
                  className='w-8 h-8 rounded-full mr-2'
                  alt='Profile'
                />
              )}
              <div
                className={`p-2 my-1 rounded-xl max-w-[70%] w-fit ${
                  msg.sender === user._id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}>
                <p>{msg.text}</p>
                <small className='text-xs block text-gray-600 text-right'>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </small>
              </div>
            </div>
          </React.Fragment>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSend}
        className='mt-4 flex gap-2 w-full'>
        <div className='relative flex items-center w-full'>
          {/* Left-side icons */}
          <div className='absolute left-3 flex items-center gap-2'>
            <EmojiPickerIcon className='w-5 h-5 cursor-pointer' />
          </div>

          {/* Input Field */}
          <input
            type='text'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className='border py-2 pl-10 pr-14 rounded-full w-full focus:outline-none'
            placeholder='Message...'
          />

          {/* Right-side icons OR Send button */}
          <div className='absolute right-3 flex items-center gap-3'>
            {newMessage.trim() ? (
              <button
                type='submit'
                className='text-sm font-semibold text-blue-500'>
                Send
              </button>
            ) : (
              <>
                <VoiceIcon />
                <ChatGallery />
                <GifIcon />
                <HurtIcon />
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
