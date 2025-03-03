/** @format */
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from "../../cards/post-card/PostCard";
import Link from "next/link";
import { footerData } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { usePost } from "@/context/PostContext";
import Comment from "@/components/modals/comment/Comment";
import LoadingSkeleton from "@/components/elements/loading-skeleton/loadingSkeleton";
import UserSuggestion from "@/components/suggestions/user-suggestions/UserSuggestion";
import FriendSuggestions from "@/components/suggestions/friend-suggestions/FriendSuggestions";

const AuthenticatedLanding = () => {
  const { user } = useAuth();
  const { allFollowingPosts } = usePost();
  const [showComment, setShowComment] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [homePageData, setHomePageData] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 6; // Number of posts per page

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await allFollowingPosts(user?.following);
    setHomePageData(data.slice(0, limit));
  };

  const loadMore = async () => {
    const data = await allFollowingPosts(user?.following);
    const nextPagePosts = data.slice((page + 1) * limit, (page + 2) * limit);

    if (nextPagePosts.length === 0) {
      setHasMore(false);
    } else {
      setHomePageData((prev) => [...prev, ...nextPagePosts]);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setShowComment(true);
  };

  return (
    <div className='flex gap-y-20 sm:px-10 lg:gap-x-20 w-full md:w-[calc(100vw-18%)] p-5'>
      <div className='w-full'>
        <FriendSuggestions />
        <InfiniteScroll
          dataLength={homePageData.length}
          next={loadMore}
          hasMore={hasMore}
          loader={
            <LoadingSkeleton
              count={3}
              homePage={true}
            />
          }>
          <div className='flex flex-col gap-10'>
            {homePageData.map((items, i) => (
              <PostCard
                key={i}
                items={items}
                handlePostClick={handlePostClick}
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>

      <div className='xl:block hidden w-80 mt-5'>
        <UserSuggestion />
        <footer>
          <ul className='flex flex-wrap my-10 w-60 gap-2'>
            {footerData.map((items, i) => (
              <li
                className='text-xs text-gray-400 hover:underline'
                key={i}>
                <Link href=''>{items.text}</Link>
              </li>
            ))}
          </ul>
          <p className='text-gray-400 uppercase text-xs font-semibold'>
            © 2024 Instagram from Meta
          </p>
        </footer>
      </div>

      <Comment
        showModal={showComment}
        setShowModal={setShowComment}
        setSelectedPost={setSelectedPost}
        postData={selectedPost}
        selectedUser={selectedPost?.user}
      />
    </div>
  );
};

export default AuthenticatedLanding;
