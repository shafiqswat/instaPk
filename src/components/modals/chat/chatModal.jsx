/** @format */
"use client";
import React, { useState } from "react";
import { CrossIcon } from "@/constants/SvgIcon";
import { useAuth } from "@/context/auth.context";
import { useChat } from "@/context/chat.context";
import Modal from "../modal/Modal";

const ChatModal = ({ isChatOpen, setIsChatOpen }) => {
  const [searchQuery, setSearchQuery] = useState("");
  // const [selectedUsers, setSelectedUsers] = useState([]);
  const { allUsers } = useAuth();
  const { setActiveThread } = useChat();

  const filteredUsers = searchQuery
    ? allUsers.filter(
        (user) =>
          user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleStartChat = (user) => {
    setActiveThread({
      otherUser: user,
      participants: [user._id],
    });
    setIsChatOpen(false);
  };

  return (
    <Modal
      showModal={isChatOpen}
      setShowModal={setIsChatOpen}>
      <div className='flex items-center justify-between p-2 border-b'>
        <div></div>
        <h2 className='font-sans font-bold text-center'>New message</h2>
        <CrossIcon
          className='w-4 h-4 cursor-pointer'
          onClick={() => setIsChatOpen(false)}
        />
      </div>

      <div className='px-2 pb-2 flex items-center flex-wrap gap-2 border-b'>
        <input
          type='text'
          placeholder='Search...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='placeholder:text-gray-500 border-0 focus:outline-none flex-grow min-w-[50px] p-2'
        />
      </div>

      <div className='w-full flex flex-col text-gray-600 text-sm h-[50vh] overflow-auto'>
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className='flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100'
            onClick={() => handleStartChat(user)}>
            <img
              src={user.profilePic}
              alt={user.userName}
              className='w-10 h-10 rounded-full'
            />
            <div>
              <p className='font-semibold'>{user.fullName || user.userName}</p>
              <p className='text-xs text-gray-500'>{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ChatModal;
