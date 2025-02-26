/** @format */

import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-around'>
      <div></div>
      <Image
        src='/icons/insta.jpg'
        width={50}
        height={50}
        alt='loading'
        priority
        className='w-auto h-auto'
      />
      <Image
        src='/icons/meta.jpg'
        width={60}
        height={60}
        alt='loading'
        className='w-auto h-auto'
      />
    </div>
  );
};

export default Loading;
