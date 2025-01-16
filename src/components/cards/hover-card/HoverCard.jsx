/** @format */

import React, { useEffect } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { MessengerIcon } from "@/constants/SvgIcon";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoadingSkeleton from "@/components/elements/loading-skeleton/loadingSkeleton";
import { usePost } from "@/context/PostContext";
const HoverCardCustom = ({ children, userData }) => {
  const { loading, user } = useAuth();
  const { fetchPosts, allPosts } = usePost();
  const router = useRouter();
  const hoverCardData = [
    { qty: userData?.postCount, text: "posts" },
    { qty: userData?.followersCount, text: "followers" },
    { qty: userData?.followingCount, text: "following" },
  ];
  const isCurrentUser = user?._id === userData?._id;
  useEffect(() => {
    if (userData && Array.isArray(userData?.posts)) {
      fetchPosts(userData?.posts);
    }
  }, [userData]);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>

      <HoverCardContent
        className='w-80 z-50 shadow-sm border rounded-lg bg-white '
        side='bottom'
        align='start'
        sideOffset={4}>
        {loading ? (
          <LoadingSkeleton loading={true} />
        ) : (
          <div className='space-y-1'>
            <div
              className='flex gap-3 items-start p-3 cursor-pointer w-fit'
              onClick={() => router.push(`/${userData.userName}`)}>
              <img
                src={userData?.profilePic}
                alt='User avatar'
                width={50}
                height={50}
                className='rounded-full border border-gray-300 '
              />
              <div>
                <h2 className='text-sm font-bold'>{userData?.userName}</h2>
                <p className='text-gray-500 text-sm'>{userData?.fullName}</p>
                {/* <div className='bg-gray-100 rounded-full text-sm text-center'>
                @ shafiq
              </div> */}
              </div>
            </div>
            <div className='flex justify-around '>
              {hoverCardData.map((items, i) => (
                <div
                  className='text-center'
                  key={i}>
                  <h2 className='font-semibold'>{items.qty}</h2>
                  <p>{items.text}</p>
                </div>
              ))}
            </div>
            <div className='flex justify-between overflow-hidden'>
              {allPosts?.slice(0, 3)?.map((post, index) =>
                post?.imageUrls?.map((imageUrl, i) => (
                  <img
                    key={`${index}-${i}`}
                    src={imageUrl}
                    alt='user'
                    className='w-[6.5rem] h-32 cursor-pointer'
                  />
                ))
              )}
            </div>
            {!isCurrentUser && (
              <div className='flex justify-center gap-2 py-2'>
                <button className='bg-[#0095f6] text-white flex items-center justify-center gap-2 text-sm w-32 p-1  rounded-xl'>
                  <MessengerIcon /> Message
                </button>
                <button className='text-sm w-32 p-1 bg-gray-100 rounded-xl'>
                  Following
                </button>
              </div>
            )}
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
};

export default HoverCardCustom;
