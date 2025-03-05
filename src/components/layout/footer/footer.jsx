/** @format */
import Post from "@/components/cards/post/Post";
import {
  CreateIcon,
  ExploreIcon,
  HomeIcon,
  MessengerIcon,
  ReelsIcon,
  SearchIcon,
} from "@/constants/SvgIcon";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React, { useState } from "react";

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const icons = [
    {
      icon: <HomeIcon className='xs:w-8 xs:h-8 w-6 h-6' />,
      href: "/",
    },
    {
      icon: <ExploreIcon className='xs:w-8 xs:h-8 w-6 h-6' />,
      href: "/explore",
    },
    {
      icon: <CreateIcon className='xs:w-8 xs:h-8 w-6 h-6' />,
      href: "#",
      click: () => setShowModal(true),
    },
    {
      icon: <ReelsIcon className='xs:w-8 xs:h-8 w-6 h-6' />,
      href: "/reels",
    },
    {
      icon: <MessengerIcon className='xs:w-8 xs:h-8 w-6 h-6' />,
      href: "/message",
    },
    {
      icon: (
        <img
          src={user?.profilePic}
          alt='User Profile'
          className='xs:w-8 xs:h-8 w-6 h-6 rounded-full'
        />
      ),
      href: `/${user?.userName}`,
    },
  ];

  return (
    <div className='bg-white block sm:hidden h-12 fixed bottom-0 left-0 right-0 shadow-2xl'>
      <nav className='flex items-center justify-between h-full px-5'>
        {icons.map((item, i) => (
          <Link
            href={item.href}
            key={i}
            onClick={item.click}>
            {item.icon}
          </Link>
        ))}
      </nav>
      <Post
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default Footer;
