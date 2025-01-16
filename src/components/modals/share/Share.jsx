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

const Share = ({ showModal, setShowModal }) => {
  const [isFocus, setIsFocus] = useState(false); // State to track input focus
  const ref = useRef();
  const iconsData = [
    {
      icon: <CopyIcon />,
      text: "Copy link",
    },
    {
      icon: <Facebook />,
      text: "Facebook",
    },
    {
      icon: <MessengerIcon />,
      text: "Messenger",
    },
    {
      icon: <WhatsappIcon />,
      text: "WhatsApp",
    },
    {
      icon: <EmailIcon />,
      text: "Email",
    },
    {
      icon: <ThreadsIcon />,
      text: "Threads",
    },
    {
      icon: <XIcon />,
      text: "X",
    },
  ];

  return (
    <div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}>
        <div className='p-2 border-b text-center'>
          <h2 className='font-semibold text-lg'>Share</h2>
        </div>
        <div>
          <form className='w-full flex gap-2 items-center relative p-3'>
            <input
              ref={ref}
              type='text'
              className='w-full p-1 rounded-lg bg-gray-200 placeholder:text-gray-700 placeholder:text-sm px-8 focus:outline-none'
              placeholder='Search'
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
            />
            <SearchIcon className='w-4 h-4 absolute top-5 left-5' />
            {isFocus && (
              <button
                className='font-medium text-sm'
                onClick={() => {
                  ref.current.value = "";
                  ref.current.blur();
                  setIsFocus(false);
                }}>
                Cancel
              </button>
            )}
          </form>
          <div className='h-80 my-2 scroll-auto overflow-y-scroll p-5 border-b'>
            <p className='text-sm text-gray-700'>No account found.</p>
          </div>
          <div className='p-5 flex gap-4'>
            {iconsData.map((items, i) => (
              <div
                key={i}
                className='cursor-pointer text-center'>
                <div className='bg-gray-200 w-12 h-12 flex items-center justify-center rounded-full'>
                  {items.icon}
                </div>
                <p className='text-xs'>{items.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Share;
