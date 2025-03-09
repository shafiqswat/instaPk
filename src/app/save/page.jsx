/** @format */

import LoadingSkeleton from "@/components/elements/loading-skeleton/loadingSkeleton";
import { usePost } from "@/context/PostContext";
import React, { useEffect } from "react";

const Save = ({ selectedUser }) => {
  const { fetchPosts, allPosts, loading } = usePost();
  useEffect(() => {
    fetchPosts(selectedUser?.favorites);
  }, []);
  return (
    <div className='grid grid-cols-3 gap-3'>
      {loading ? (
        <LoadingSkeleton
          count={9}
          className='w-full h-[150px] sm:h-[300px] md:h-[350px]'
        />
      ) : (
        allPosts.map((items, i) => (
          <div key={i}>
            <SocialCard
              handlePostClick={handlePostClick}
              items={items}
              index={i}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Save;
