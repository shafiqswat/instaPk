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
import SearchSuggestions from "@/components/cards/searchSuggestion/SearchSuggestions";
import { useChat } from "@/context/chat.context";
import { useRouter } from "next/navigation";

const Share = ({ showModal, setShowModal }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { allUsers, user } = useAuth();
  const ref = useRef();
  const { setActiveThread, activeThread, conversations } = useChat();
  const router = useRouter();
  const followingUser =
    allUsers?.filter((u) => u?.following?.includes(user?._id)) || [];

  const filteredUsers = followingUser.filter(
    (u) =>
      u.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log("conversations", conversations);
  const handleUserClick = (user) => {
    setActiveThread({
      otherUser: user,
      participants: [user._id],
    });
    router.push("/message");
  };

  const iconsData = [
    { icon: <CopyIcon />, text: "Copy link" },
    { icon: <Facebook />, text: "Facebook" },
    { icon: <MessengerIcon />, text: "Messenger" },
    { icon: <WhatsappIcon />, text: "WhatsApp" },
    { icon: <EmailIcon />, text: "Email" },
    { icon: <ThreadsIcon />, text: "Threads" },
    { icon: <XIcon />, text: "X" },
  ];

  return (
    <div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        className='w-[90%] max-w-[500px] max-h-[97vh] overflow-hidden'>
        <div className='p-2 border-b text-center'>
          <h2 className='font-semibold text-lg'>Share</h2>
        </div>
        <div>
          <form
            className='w-full flex gap-2 items-center relative p-3'
            onSubmit={(e) => e.preventDefault()}>
            <input
              ref={ref}
              type='text'
              className='w-full p-1 rounded-lg bg-gray-200 placeholder:text-gray-700 placeholder:text-sm px-8 focus:outline-none'
              placeholder='Search'
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon className='w-4 h-4 absolute top-5 left-5' />
            {isFocus && (
              <button
                type='button'
                className='font-medium text-sm'
                onClick={() => {
                  setSearchTerm("");
                  ref.current?.blur();
                  setIsFocus(false);
                }}>
                Cancel
              </button>
            )}
          </form>

          <div className='h-80 my-2 overflow-y-scroll p-5 border-b'>
            {filteredUsers.length > 0 ? (
              <SearchSuggestions
                data={filteredUsers}
                onClick={handleUserClick}
              />
            ) : (
              <p className='text-sm text-gray-700'>No account found.</p>
            )}
          </div>

          <div className='p-5 grid grid-cols-4 gap-4'>
            {iconsData.map((item, i) => (
              <div
                key={i}
                className='cursor-pointer text-center'>
                <div className='bg-gray-200 w-12 h-12 flex items-center justify-center rounded-full mx-auto'>
                  {item.icon}
                </div>
                <p className='text-xs mt-1'>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Share;
