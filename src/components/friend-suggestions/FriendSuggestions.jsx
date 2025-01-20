/** @format */

"use client";
import { Plus, UserCheck, UserPlus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Post from "../cards/post/Post";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const FriendSuggestions = () => {
  const [follow, setFollow] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const { user, GetAllUsers } = useAuth();
  const firstUsers = allUser.slice(0, 3);
  const ref = useRef();
  const router = useRouter();

  const handleClick = (userId) => {
    setFollow((prevFollow) => ({
      ...prevFollow,
      [userId]: !prevFollow[userId],
    }));
  };

  const fetchUser = async () => {
    try {
      const users = await GetAllUsers();
      setAllUser(users);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [router]);

  useEffect(() => {
    if (user) {
      const userFollowStatus = user?.following.reduce((acc, userId) => {
        acc[userId] = true;
        return acc;
      }, {});
      setFollow(userFollowStatus);
    }
  }, [user]);

  return (
    <div className='flex overflow-x-auto gap-5 py-2 scrollbar-hidden'>
      <div className='relative w-20 h-20 text-center flex-shrink-0 mb-7'>
        <img
          src={user?.profilePic}
          alt='user'
          className='rounded-full h-full w-full object-cover cursor-pointer'
          onClick={() => router.push(`${items.userName}`)}
        />
        <p className='text-xs mt-2'>Your story</p>
        {/* <div className='border-2 bg-white text-black rounded-xl absolute -bottom-2 left-6 px-2 py-1'> */}
        <Plus
          className='border-2 border-white bg-blue-500 text-white rounded-full absolute bottom-0 right-0 cursor-pointer'
          ref={ref}
          onClick={() => setShowModal(true)}
        />
        {/* </div> */}
      </div>
      {firstUsers.map((items) => (
        <div
          className='relative w-20 h-20 text-center flex-shrink-0 mb-7'
          key={items._id}>
          <img
            src={items.profilePic}
            alt='user'
            className='rounded-full h-full w-full object-cover cursor-pointer'
            onClick={() => router.push(`${items.userName}`)}
          />
          <p className='text-xs mt-2'>{items.userName}</p>
          <div className='border-2 bg-white text-black rounded-xl absolute -bottom-2 left-6 px-2 py-1'>
            {!follow[items._id] ? (
              <UserPlus
                className='w-4 h-4 cursor-pointer'
                onClick={() => handleClick(items._id)}
              />
            ) : (
              <UserCheck
                className='w-4 h-4 cursor-pointer'
                onClick={() => handleClick(items._id)}
              />
            )}
          </div>
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

// ///////////////  data ba sanga add kaw da dwa user pa minx ke secure,
/////////////////  post legal , total data one time
///////////////  notifications ,
//////// users: useraname , id , node js
///////// notification / seneder id  , reciver id , read , timestemp will be use for every doc
//////// threads / doc  create from two ids of messaging user / last message  /  last message sender  / participant array / delete obj /subcollection messages /content / sender id
