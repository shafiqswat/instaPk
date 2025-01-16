/** @format */
"use client";
import ProtectedRoute from "@/components/protected-route/ProtectedRoute";
import { useFollow } from "@/context/FollowContext";
import { usePost } from "@/context/PostContext";
import React, { useEffect } from "react";

const Save = ({ user, isCurrentUser }) => {
  const { AllSavePosts, saveData } = useFollow();
  const { fetchPosts, allPosts } = usePost();
  useEffect(() => {
    AllSavePosts();
  }, []);
  useEffect(() => {
    fetchPosts(user._id);
  }, []);
  return (
    <ProtectedRoute>
      <div className='p-5 grid grid-cols-3'>
        <div className='col-span-1 grid grid-cols-2 cursor-pointer group relative '>
          {Array.isArray(allPosts) &&
            allPosts.slice(0, 4).map((img, i) => (
              <img
                src={img.imageUrls[0]}
                alt='savedPosts'
                key={i}
              />
            ))}
          <div className='absolute inset-0 hidden group-hover:block transition-opacity bg-black opacity-40'></div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Save;
