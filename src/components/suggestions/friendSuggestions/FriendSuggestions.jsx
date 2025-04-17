/** @format */
"use client";
import { Plus, UserCheck, UserPlus } from "lucide-react";
import React, { useState, useMemo } from "react";
import { useAuth } from "@/context/auth.context";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CreatePost from "@/components/cards/createPost/CreatePost";

const FriendSuggestions = () => {
  const { user, allUsers, handleFollow, setIsFollow, isFollow } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  /*<<<<<<<<<<<---------------------   Get First Three Users / other then the current user  ------------------------->>>>>>>>>>>>> */

  const filteredUsers = allUsers.filter((u) => u._id !== user?._id);
  const firstUsers = useMemo(() => filteredUsers.slice(0, 3), [allUsers]);

  return (
    <div className='flex overflow-x-auto gap-3 sm:gap-5 h-28 scrollbar-hidden overflow-hidden mb-5'>
      <div className='relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 text-center flex-shrink-0'>
        <Image
          src={user?.profilePic}
          alt='user'
          width={80}
          height={80}
          className='rounded-full h-full w-full object-cover cursor-pointer'
          onClick={() => router.push(`/${user?.userName}`)}
        />
        <p className='text-xs mt-1'>Your story</p>
        <Plus
          className='border-2 border-white bg-blue-500 text-white rounded-full absolute bottom-0 right-0 cursor-pointer'
          onClick={() => setShowModal(true)}
        />
      </div>

      {firstUsers.map((items) => (
        <div
          className='relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 text-center flex-shrink-0'
          key={items._id || items.userName}>
          <Image
            src={items.profilePic}
            alt='user'
            width={80}
            height={80}
            className='rounded-full h-full w-full object-cover cursor-pointer mb-2'
            onClick={() => router.push(`/${items.userName}`)}
          />
          <p className='text-xs mt-1'>{items.userName}</p>

          <div className='border-2 bg-white text-black rounded-xl absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-2 py-1'>
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

      <CreatePost
        showModal={showModal}
        setShowModal={setShowModal}
        story={true}
      />
    </div>
  );
};

export default FriendSuggestions;
