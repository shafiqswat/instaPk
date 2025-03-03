/** @format */

import { CommentsIcon } from "@/constants/SvgIcon";
import React from "react";

const SocialCard = ({ items, index, handlePostClick, isBoost }) => {
  return (
    <div
      className='relative cursor-pointer group'
      key={index}
      onClick={() => handlePostClick(items)}>
      {items?.imageUrls?.slice(0, 1).map((img, j) => (
        <img
          key={j}
          src={img}
          alt='post1'
          className='w-full h-[150px] sm:h-[300px] md:h-[350px] object-cover'
        />
      ))}
      <div
        className={`absolute inset-0 hidden bg-black opacity-70 transition-opacity group-hover:flex flex-col items-center ${
          !isBoost && "justify-center"
        }`}>
        <div className={`flex items-center gap-2 ${isBoost && "mt-auto"}`}>
          <CommentsIcon className='text-white' />
          <p className='text-white font-semibold'>{items?.commentsCount}</p>
        </div>
        {isBoost && (
          <button className='bg-white py-2 px-5 rounded-2xl mt-auto mb-4 font-semibold'>
            Boost post
          </button>
        )}
      </div>
    </div>
  );
};

export default SocialCard;
