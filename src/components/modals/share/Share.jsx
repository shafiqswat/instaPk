/** @format */

import React, { useRef, useState } from "react";
import Modal from "../modal/Modal";
import {
  CopyIcon,
  EmailIcon,
  MessengerIcon,
  SearchIcon,
  ThreadsIcon,
  XIcon,
  WhatsappIcon,
} from "@/constants/SvgIcon";
import { Facebook } from "lucide-react";
import { useAuth } from "@/context/auth.context";
import { useChat } from "@/context/chat.context";
import { useRouter } from "next/navigation";

const Share = ({ showModal, setShowModal, postId }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { allUsers, user } = useAuth();
  const ref = useRef();
  const { setActiveThread, sendMessageToUser } = useChat();
  const router = useRouter();

  const filteredUsers = allUsers?.filter(
    (u) =>
      u._id !== user?._id &&
      (u.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.fullName?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleUserSelect = (selectedUser) => {
    if (selectedUsers.find((u) => u._id === selectedUser._id)) {
      setSelectedUsers(selectedUsers.filter((u) => u._id !== selectedUser._id));
    } else {
      setSelectedUsers([...selectedUsers, selectedUser]);
    }
  };
  // setMessage(postLink);
  const handleShare = async () => {
    const postLink = `https://insta-pk.vercel.app/post/${postId}`;
    if (selectedUsers.length === 0) return;
    // Share with each selected user
    for (const selectedUser of selectedUsers) {
      const threadId = [selectedUser._id, user?._id].sort().join("_");
      setActiveThread({
        otherUser: selectedUser,
        participants: [selectedUser._id],
        _id: threadId,
      });
      // Redirect to the message thread
      router.push(`/message?threadId=${threadId}`);
    }
    setMessage(postLink);
    setShowModal(false);
  };
  const iconsData = [
    {
      icon: <CopyIcon />,
      text: "Copy link",
      onClick: () => navigator.clipboard.writeText(window.location.href),
    },
    {
      icon: <Facebook className='text-blue-600' />,
      text: "Facebook",
      onClick: () =>
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`
        ),
    },
    {
      icon: <MessengerIcon className='text-blue-500' />,
      text: "Messenger",
      onClick: () =>
        window.open(`fb-messenger://share/?link=${window.location.href}`),
    },
    {
      icon: <WhatsappIcon className='text-green-500' />,
      text: "WhatsApp",
      onClick: () =>
        window.open(
          `https://api.whatsapp.com/send?text=${window.location.href}`
        ),
    },
    {
      icon: <EmailIcon className='text-gray-600' />,
      text: "Email",
      onClick: () => window.open(`mailto:?body=${window.location.href}`),
    },
    {
      icon: <ThreadsIcon className='text-black' />,
      text: "Threads",
      onClick: () =>
        window.open(
          `https://threads.net/intent/post?url=${window.location.href}`
        ),
    },
    {
      icon: <XIcon />,
      text: "X",
      onClick: () =>
        window.open(
          `https://twitter.com/intent/tweet?url=${window.location.href}`
        ),
    },
  ];
  return (
    <div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        className='w-[90%]  max-w-[500px] max-h-[97vh] overflow-hidden'>
        <div className='p-4 border-b text-center relative'>
          <h2 className='font-semibold text-xl'>Share Post</h2>
          {selectedUsers.length > 0 && (
            <button
              onClick={handleShare}
              className='absolute right-4 top-4 text-blue-500 font-semibold hover:text-blue-600 transition-colors'>
              Share
            </button>
          )}
        </div>
        <div>
          <form
            className='w-full flex gap-2 items-center relative p-4'
            onSubmit={(e) => e.preventDefault()}>
            <input
              ref={ref}
              type='text'
              className='w-full p-2.5 rounded-lg bg-gray-100 placeholder:text-gray-600 text-sm px-10 focus:outline-none focus:bg-gray-50 transition-colors'
              placeholder='Search users to share with...'
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <SearchIcon className='w-4 h-4 absolute top-[22px] left-7 text-gray-500' />
            {isFocus && (
              <button
                type='button'
                className='font-medium text-sm text-blue-500 hover:text-blue-600'
                onClick={() => {
                  setSearchTerm("");
                  ref.current?.blur();
                  setIsFocus(false);
                }}>
                Clear
              </button>
            )}
          </form>

          {selectedUsers.length > 0 && (
            <div className='px-4 pb-2 flex flex-wrap gap-2'>
              {selectedUsers.map((user) => (
                <div
                  key={user._id}
                  className='bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm flex items-center gap-2'>
                  {user.userName}
                  <button
                    onClick={() => handleUserSelect(user)}
                    className='text-blue-400 hover:text-blue-600'>
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className='max-h-[300px] my-2 overflow-y-auto p-4 border-b'>
            {filteredUsers.length > 0 ? (
              <div className='space-y-2'>
                {filteredUsers.map((user) => (
                  <div
                    key={user._id}
                    onClick={() => handleUserSelect(user)}
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                      selectedUsers.find((u) => u._id === user._id)
                        ? "bg-blue-50"
                        : "hover:bg-gray-50"
                    }`}>
                    <img
                      src={user.profilePic}
                      alt={user.userName}
                      className='w-10 h-10 rounded-full object-cover'
                    />
                    <div className='flex-1'>
                      <p className='font-semibold text-sm'>{user.userName}</p>
                      <p className='text-gray-500 text-sm'>{user.fullName}</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedUsers.find((u) => u._id === user._id)
                          ? "border-blue-500 bg-blue-500 text-white"
                          : "border-gray-300"
                      }`}>
                      {selectedUsers.find((u) => u._id === user._id) && "✓"}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-sm text-gray-500 text-center py-4'>
                No users found
              </p>
            )}
          </div>

          <div className='p-4 grid grid-cols-4 gap-6'>
            {iconsData.map((item, i) => (
              <button
                key={i}
                onClick={item.onClick}
                className='cursor-pointer text-center group transition-transform hover:scale-105'>
                <div className='bg-gray-100 w-12 h-12 flex items-center justify-center rounded-full mx-auto group-hover:bg-gray-200 transition-colors'>
                  {item.icon}
                </div>
                <p className='text-xs mt-2 text-gray-600'>{item.text}</p>
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Share;
