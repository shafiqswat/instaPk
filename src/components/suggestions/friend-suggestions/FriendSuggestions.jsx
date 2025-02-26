/** @format */
"use client";
import { Plus, UserCheck, UserPlus } from "lucide-react";
import React, { useState, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Post from "@/components/cards/post/Post";

const FriendSuggestions = () => {
  const { user, allUsers, handleFollow, setIsFollow, isFollow } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  /*<<<<<<<<<<<---------------------   Get First Three Users / other then the current user  ------------------------->>>>>>>>>>>>> */

  const filteredUsers = allUsers.filter((u) => u._id !== user?._id);
  const firstUsers = useMemo(() => filteredUsers.slice(0, 3), [allUsers]);

  return (
    <div className='flex overflow-x-auto gap-5 -mt-5 sm:m-0 pb-2 scrollbar-hidden scrollbar-none'>
      {/*<<<<<<<<<<<---------------------  Your Story    ------------------------->>>>>>>>>>>>> */}

      <div className='relative w-16 h-16 sm:w-20 sm:h-20 text-center flex-shrink-0 mb-7'>
        <img
          src={user?.profilePic}
          alt='user'
          className='rounded-full h-full w-full object-cover cursor-pointer'
          onClick={() => router.push(`/${user?.userName}`)}
        />
        <p className='text-xs mt-2'>Your story</p>
        <Plus
          className='border-2 border-white bg-blue-500 text-white rounded-full absolute bottom-0 right-0 cursor-pointer'
          onClick={() => setShowModal(true)}
        />
      </div>

      {/*<<<<<<<<<<<---------------------  Map the First Three Users  ------------------------->>>>>>>>>>>>> */}
      {firstUsers.map((items) => (
        <div
          className='relative w-16 h-16 sm:w-20 sm:h-20 text-center flex-shrink-0 mb-7'
          key={items._id || items.userName}>
          <img
            src={items.profilePic}
            alt='user'
            className='rounded-full h-full w-full object-cover cursor-pointer'
            onClick={() => router.push(`/${items.userName}`)}
          />
          <p className='text-xs mt-2'>{items.userName}</p>

          {/*<<<<<<<<<<<---------------------   Check Follow State   ------------------------->>>>>>>>>>>>> */}
          <div className='border-2 bg-white text-black rounded-xl absolute -bottom-2 left-[1rem] sm:left-6 px-2 py-1'>
            {isFollow[items._id] ? (
              <UserCheck
                className='w-4 h-4 cursor-pointer'
                onClick={() =>
                  handleFollow(user._id, items._id, isFollow, setIsFollow)
                }
              />
            ) : (
              <UserPlus
                className='w-4 h-4 cursor-pointer'
                onClick={() =>
                  handleFollow(user._id, items._id, isFollow, setIsFollow)
                }
              />
            )}
          </div>
        </div>
      ))}

      {/*<<<<<<<<<<<---------------------   Post Story Modal  ------------------------->>>>>>>>>>>>> */}
      <Post
        showModal={showModal}
        setShowModal={setShowModal}
        story={true}
      />
    </div>
  );
};

export default FriendSuggestions;
