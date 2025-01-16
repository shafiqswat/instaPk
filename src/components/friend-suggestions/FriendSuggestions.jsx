/** @format */
"use client";
import { Plus, UserCheck, UserPlus } from "lucide-react";
import { document } from "postcss";
import React, { useEffect, useRef, useState } from "react";
import Post from "../cards/post/Post";
import { useFollow } from "@/context/FollowContext";

const FriendSuggestions = () => {
  // Store follow state for each suggestion item
  const [follow, setFollow] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const ref = useRef();

  const handleClick = (index) => {
    setFollow((prevFollow) => {
      const newFollow = [...prevFollow];
      newFollow[index] = !newFollow[index]; // Toggle the follow state
      return newFollow;
    });
  };

  const SuggestionData = [
    {
      story: true,
      imgPath: "/user.jpg",
      text: "Your story",
      icon: (
        <Plus
          className='border-2 border-white bg-blue-500 text-white rounded-full absolute bottom-0 right-0'
          ref={ref}
          onClick={() => setShowModal(true)}
        />
      ),
    },
    {
      imgPath: "/user.jpg",
      text: "shafiq",
    },
    {
      imgPath: "/user.jpg",
      text: "shujat",
    },
    {
      imgPath: "/user.jpg",
      text: "sadeeq",
    },
  ];

  return (
    <div className='flex overflow-x-auto gap-5  py-2 scrollbar-hidden'>
      {SuggestionData.map((items, i) => (
        <div
          className='relative w-20 h-20 text-center flex-shrink-0 mb-7'
          key={i}>
          <img
            src={items.imgPath}
            alt='user'
            className='rounded-full h-full w-full object-cover'
          />
          <p className='text-xs mt-2'>{items.text}</p>
          {items.story ? (
            <span className='cursor-pointer'>{items.icon}</span>
          ) : (
            <div className='border-2 bg-white text-black rounded-xl absolute -bottom-2 left-6 px-2 py-1'>
              {!follow[i] ? (
                <UserPlus
                  className='w-4 h-4 cursor-pointer'
                  onClick={() => handleClick(i)}
                />
              ) : (
                <UserCheck
                  className='w-4 h-4 cursor-pointer'
                  onClick={() => postStory()}
                />
              )}
            </div>
          )}
        </div>
      ))}
      <Post
        showModal={showModal}
        setShowModal={setShowModal}
        story={true}
      />
    </div>
  );
};

export default FriendSuggestions;
