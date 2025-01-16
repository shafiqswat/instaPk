/** @format */
"use client";
import { ThreeDotsIcon } from "@/constants/SvgIcon";

import React, { useEffect, useState } from "react";
import HoverCardCustom from "../hover-card/HoverCard";
import Share from "../../modals/share/Share";
import Report from "@/components/modals/report/Report";
import CarouselCustom from "@/components/carousel/Carousel";
import CommentsForm from "@/components/form-items/comments-form/CommentsForm";
import { useAuth } from "@/context/AuthContext";

import useCompactTimeFormat from "@/components/hooks/useCompactTimeFormat";
import { useRouter } from "next/navigation";

const PostCard = ({ items, handlePostClick }) => {
  const [showModal, setShowModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const { user, singleUser, singleUserData } = useAuth();
  const router = useRouter();
  const [isFollow, setIsFollow] = useState(
    user?.following?.includes(items?.user?._id)
  );
  const handleHover = (selectedUser) => {
    singleUser(selectedUser._id);
  };
  useEffect(() => {
    if (user?.following && items?._id) {
      setIsFollow(user.following.includes(items?.user?._id));
    }
  }, [user?.following, items?._id]);
  const formattedTime = useCompactTimeFormat(items.createdAt);
  return (
    <div className='sm:w-[468px] w-full sm:mx-auto'>
      <div className='flex items-center gap-2'>
        <div className='flex items-center gap-2 cursor-pointer'>
          <HoverCardCustom userData={singleUserData}>
            <img
              onClick={() => router.push(`/${items.user.userName}`)}
              onMouseOver={() => handleHover(items?.user)}
              src={items.user.profilePic}
              alt='User avatar'
              width={32}
              height={32}
              className='rounded-full border border-gray-300'
            />
          </HoverCardCustom>
          <HoverCardCustom userData={singleUserData}>
            <h2
              className='font-semibold text-sm md:block hidden'
              onMouseOver={() => handleHover(items?.user)}
              onClick={() => router.push(`/${items.user.userName}`)}>
              {items.user.userName}
            </h2>
          </HoverCardCustom>

          <div className='md:hidden block'>
            <h2 className='text-xs font-semibold'>shafiq.edit7</h2>
            <p className='text-xs'>suggested for you</p>
          </div>
        </div>

        <p className='text-gray-500 text-xs cursor-pointer md:block hidden'>
          . {formattedTime}
        </p>
        <div className='ml-auto flex items-center gap-3'>
          <button className='text-sm border py-1 px-2 rounded-lg md:hidden block'>
            Follow
          </button>

          <ThreeDotsIcon
            className='md:block hidden'
            onClick={() => {
              setShowModal(true);
            }}
          />
          <ThreeDotsIcon
            className='md:hidden block'
            direction='vertical'
            onClick={() => {}}
          />
        </div>
      </div>

      {/* Image */}
      <CarouselCustom postData={items}>
        {items?.imageUrls?.map((img, i) => (
          <img
            key={i}
            src={img}
            alt='Post content'
            className='w-full object-cover cursor-pointer mt-5 '
          />
        ))}
      </CarouselCustom>
      <CommentsForm
        IconParentStyle='right-0 bottom-9'
        homePage={true}
        handleModal={() => handlePostClick(items)}
        btnStyle='right-[45px] bottom-8'
        IconStyle='top-0'
        user={user}
        items={items}
      />

      <Report
        showModal={showModal}
        setShowModal={setShowModal}
        isFollow={isFollow}
        setIsFollow={setIsFollow}
        userId={items?.user?._id}
      />

      <Share
        showModal={showShareModal}
        setShowModal={setShowShareModal}
      />
    </div>
  );
};

export default PostCard;
