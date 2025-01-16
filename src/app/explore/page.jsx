/** @format */

"use client";
import React, { useEffect, useState, useRef } from "react";
import SocialCard from "@/components/cards/social-card/SocialCard";
import LoadingSkeleton from "@/components/elements/loading-skeleton/loadingSkeleton";
import Comment from "@/components/modals/comment/Comment";
import ProtectedRoute from "@/components/protected-route/ProtectedRoute";
import { usePage } from "@/context/PagesContext";

const ExplorePage = () => {
  const { explorePageData, explorePage, loading, setExplorePageData } =
    usePage();
  const [limit] = useState(6);
  const [page, setPage] = useState(0);
  const [showComment, setShowComment] = useState(false);
  const [selectedPost, setSelectedPost] = useState(false);
  const loader = useRef(null);

  // Fetch the initial data
  useEffect(() => {
    const fetchData = async () => {
      await explorePage(limit * (page + 1));
    };
    fetchData();
  }, [page]);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setShowComment(true);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loader, loading]);

  return (
    <ProtectedRoute>
      <div className='grid grid-cols-3 gap-3 p-5'>
        {explorePageData?.slice(0, limit * (page + 1)).map((items, i) => (
          <div key={i}>
            <SocialCard
              handlePostClick={handlePostClick}
              items={items}
              index={i}
            />
          </div>
        ))}

        {loading && <LoadingSkeleton count={6} />}

        <div
          ref={loader}
          style={{ height: "20px", background: "transparent" }}
        />
      </div>

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
