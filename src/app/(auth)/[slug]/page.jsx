/** @format */
"use client";
import SocialCard from "@/components/cards/socialCard/SocialCard";
import LoadingSkeleton from "@/components/elements/loading-skeleton/loadingSkeleton";
import Comment from "@/components/modals/comment/Comment";
import { useAuth } from "@/context/auth.context";
import { usePost } from "@/context/post.context";
import React, { useEffect, useState } from "react";

const MyPosts = ({ isCurrentUser, searchUser }) => {
  const { myPosts, myPostsData, loading } = usePost();
  const [showComment, setShowComment] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const { user } = useAuth();
  useEffect(() => {
    myPosts(searchUser?._id);
  }, []);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setShowComment(true);
  };
  const sortedPosts = myPostsData?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className='grid grid-cols-3 gap-3'>
      {loading ? (
        <LoadingSkeleton
          count={9}
          className='w-full h-[150px] sm:h-[300px] md:h-[350px]'
        />
      ) : (
        sortedPosts.map((items, i) => (
          <div key={i}>
            <SocialCard
              handlePostClick={handlePostClick}
              items={items}
              index={i}
            />
          </div>
        ))
      )}
      <Comment
        showModal={showComment}
        setShowModal={setShowComment}
        postData={selectedPost}
        setSelectedPost={setSelectedPost}
        selectedUser={isCurrentUser ? user : searchUser}
        isCurrentUser={isCurrentUser}
      />
    </div>
  );
};

export default MyPosts;
