/** @format */
import React, { useEffect, useRef, useState } from "react";
import PostCard from "../../cards/post-card/PostCard";
import Link from "next/link";
import { footerData } from "@/constants";
import { usePage } from "@/context/PagesContext";
import Comment from "@/components/modals/comment/Comment";
import LoadingSkeleton from "@/components/elements/loading-skeleton/loadingSkeleton";
import { useFollow } from "@/context/FollowContext";
import UserSuggestion from "@/components/suggestions/user-suggestions/UserSuggestion";
import FriendSuggestions from "@/components/suggestions/friend-suggestions/FriendSuggestions";

const AuthenticatedLanding = () => {
  const { homePage, homePageData, loading, setHomePageData } = usePage();
  const { getStories } = useFollow();
  const [showComment, setShowComment] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [limit] = useState(6);
  const [page, setPage] = useState(0);
  const loader = useRef(null);

  /*<<<<<<<<<<<---------------------   Fetch the Home Page Posts  ------------------------->>>>>>>>>>>>> */

  useEffect(() => {
    const fetchData = async () => {
      const data = await homePage(limit * (page + 1));
      setHomePageData((prev) => [...prev, ...data]);
    };
    fetchData();
  }, [page]);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setShowComment(true);
  };

  /*<<<<<<<<<<<---------------------   Implement The infinite-scroll  ------------------------->>>>>>>>>>>>> */

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries) {
          if (entries[0].isIntersecting && !loading) {
            setPage((prev) => prev + 1);
          }
        }
      },
      { threshold: 1 }
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

  /*<<<<<<<<<<<---------------------  Fetch All the Stories  ------------------------->>>>>>>>>>>>> */

  useEffect(() => {
    getStories();
  }, []);

  return (
    <div className='flex gap-y-20 sm:px-10 lg:gap-x-20 w-full sm:w-[80%] sm:mx-auto'>
      {/*<<<<<<<<<<<---------------------  Friend Suggestion and Post card  ------------------------->>>>>>>>>>>>> */}

      <div className='w-full'>
        <FriendSuggestions />
        <div className='flex flex-col gap-10'>
          {homePageData?.map((items, i) => (
            <PostCard
              items={items}
              handlePostClick={handlePostClick}
              key={i}
            />
          ))}
          {loading && (
            <LoadingSkeleton
              count={3}
              homePage={true}
            />
          )}
          <div
            ref={loader}
            style={{ height: "20px", background: "transparent" }}
          />
        </div>
      </div>

      {/*<<<<<<<<<<<---------------------  User Suggestion and Footer  ------------------------->>>>>>>>>>>>> */}

      <div className='lg:block hidden w-80 mt-5'>
        <UserSuggestion />
        <footer>
          <ul className='flex flex-wrap my-10 w-60 gap-2'>
            {footerData.map((items, i) => (
              <li
                className='text-xs text-gray-400 hover:underline'
                key={i}>
                <Link href=''>.{items.text}</Link>
              </li>
            ))}
          </ul>
          <p className='text-gray-400 uppercase text-xs font-semibold'>
            © 2024 Instagram from Meta
          </p>
        </footer>
      </div>

      {/*<<<<<<<<<<<---------------------   Comments Modal  ------------------------->>>>>>>>>>>>> */}

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
