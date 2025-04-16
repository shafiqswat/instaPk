/** @format */
"use client";
import React, { useEffect, useState } from "react";
import SocialCard from "@/components/cards/social-card/SocialCard";
import LoadingSkeleton from "@/components/elements/loading-skeleton/loadingSkeleton";
import Comment from "@/components/modals/comment/Comment";
import ProtectedRoute from "@/components/protected-route/ProtectedRoute";
import { usePost } from "@/context/post.context";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearch } from "@/context/search.context";
import UserSuggestion from "@/components/cards/user-suggestion/userSuggestion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth.context";

const ExplorePage = () => {
  const { getAppPosts } = usePost();
  const [explorePageData, setExplorePageData] = useState([]);
  const [showComment, setShowComment] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { userData, setUserData, getUser } = useSearch();
  const { allUsers } = useAuth();
  const router = useRouter();
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

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.trim().length > 0) {
      getUser(value, allUsers);
      setIsFocused(true);
    } else {
      setUserData([]);
      setIsFocused(false);
    }
  };

  const handleClick = (item) => {
    router.push(`/${item.userName}`);
    setIsFocused(false);
  };

  return (
    <ProtectedRoute>
      <div className='relative w-full p-3 md:hidden block'>
        <input
          type='text'
          id='text'
          placeholder='Search for users...'
          value={searchValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className='w-full border p-2 rounded-md focus:outline-none'
        />

        {isFocused && userData.length > 0 && (
          <div className='absolute w-full bg-white shadow-lg rounded-md mt-2 z-50 max-h-60 overflow-y-auto'>
            <UserSuggestion
              data={userData}
              onClick={handleClick}
            />
          </div>
        )}
      </div>

      <InfiniteScroll
        dataLength={explorePageData.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <div className='grid grid-cols-3 gap-3 p-5'>
            <LoadingSkeleton
              count={6}
              className='w-full h-[150px] sm:h-[300px] md:h-[350px]'
            />
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
