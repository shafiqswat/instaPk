/** @format */
"use client";
import React, { useEffect, useState } from "react";
import SocialCard from "@/components/cards/social-card/SocialCard";
import LoadingSkeleton from "@/components/elements/loading-skeleton/loadingSkeleton";
import Comment from "@/components/modals/comment/Comment";
import ProtectedRoute from "@/components/protected-route/ProtectedRoute";
import { usePost } from "@/context/PostContext";
import { useAuth } from "@/context/AuthContext";
import InfiniteScroll from "react-infinite-scroll-component";

const ExplorePage = () => {
  const { user } = useAuth();
  const { getAppPosts } = usePost();
  const [explorePageData, setExplorePageData] = useState([]);
  const [showComment, setShowComment] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 6;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getAppPosts();
    setExplorePageData(data.slice(0, limit));
  };

  const loadMore = async () => {
    const data = await getAppPosts();
    const nextPagePosts = data.slice((page + 1) * limit, (page + 2) * limit);

    if (nextPagePosts.length === 0) {
      setHasMore(false);
    } else {
      setExplorePageData((prev) => [...prev, ...nextPagePosts]);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setShowComment(true);
  };

  return (
    <ProtectedRoute>
      <InfiniteScroll
        dataLength={explorePageData.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <div className='grid grid-cols-3 gap-3 p-5'>
            <LoadingSkeleton count={6} />
          </div>
        }>
        <div className='grid grid-cols-3 gap-3 p-5'>
          {explorePageData.map((items, i) => (
            <div key={i}>
              <SocialCard
                handlePostClick={handlePostClick}
                items={items}
                index={i}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>

      <Comment
        showModal={showComment}
        setShowModal={setShowComment}
        postData={selectedPost}
        setSelectedPost={setSelectedPost}
        selectedUser={selectedPost?.user}
      />
    </ProtectedRoute>
  );
};

export default ExplorePage;
