/** @format */
import React, { useEffect, useRef, useState } from "react";
import PostCard from "../../cards/post-card/PostCard";
import Link from "next/link";
import HoverCardCustom from "../../cards/hover-card/HoverCard";
import { footerData, suggestionDeskTopData } from "@/constants";
import { usePage } from "@/context/PagesContext";
import Comment from "@/components/modals/comment/Comment";
import LoadingSkeleton from "@/components/elements/loading-skeleton/loadingSkeleton";
import FriendSuggestions from "@/components/friend-suggestions/FriendSuggestions";
import { useFollow } from "@/context/FollowContext";

const AuthenticatedLanding = () => {
  const { homePage, homePageData, loading, setHomePageData } = usePage();
  const { getStories } = useFollow();
  const [showComment, setShowComment] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [limit] = useState(6);
  const [page, setPage] = useState(0);
  const loader = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await homePage(limit * (page + 1));
      setHomePageData((prev) => [...prev, ...data]);
    };
    fetchData();
  }, [page, limit, homePage, setHomePageData]);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setShowComment(true);
  };

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
  useEffect(() => {
    getStories();
  }, []);
  return (
    <div className='flex gap-y-20 px-10 lg:gap-x-20 w-full sm:w-[80%] sm:mx-auto'>
      <div>
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
              className='sm:w-[468px] w-full'
              homePage={true}
            />
          )}
          <div
            ref={loader}
            style={{ height: "20px", background: "transparent" }}
          />
        </div>
      </div>

      <div className='lg:block hidden w-80 mt-5'>
        {suggestionDeskTopData.map((items, i) => (
          <div
            className='flex items-center justify-center gap-2 mb-4'
            key={i}
            index={i}>
            {!items.seeAll ? (
              <>
                <HoverCardCustom>
                  <img
                    src={items.imgPath}
                    alt='avatar'
                    className='w-10 h-10 rounded-full cursor-pointer'
                  />
                </HoverCardCustom>
                <div>
                  <HoverCardCustom>
                    <h2 className='font-semibold text-sm cursor-pointer'>
                      {items.userName}
                    </h2>
                  </HoverCardCustom>
                  <p className='text-sm text-gray-400'>{items.name}</p>
                </div>
              </>
            ) : (
              <h2 className='text-sm font-semibold text-gray-400'>
                Suggested for you
              </h2>
            )}
            <p
              className={`ms-auto cursor-pointer text-xs font-semibold ${
                items.className || "text-[#0095f6] hover:text-[#00376b]"
              }`}>
              {items.text}
            </p>
          </div>
        ))}
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
