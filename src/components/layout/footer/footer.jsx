/** @format */
import {
  HomeIcon,
  MessengerIcon,
  ReelsIcon,
  SearchIcon,
} from "@/constants/SvgIcon";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const { user } = useAuth();
  const icons = [
    {
      icon: <HomeIcon className='w-8 h-8' />,
      href: "/",
    },
    {
      icon: <SearchIcon className='w-8 h-8' />,
      href: "/search",
    },
    {
      icon: <ReelsIcon className='w-8 h-8' />,
      href: "/reels",
    },
    {
      icon: <MessengerIcon className='w-8 h-8' />,
      href: "/message",
    },
    {
      icon: (
        <img
          src={user?.profilePic}
          alt='profile-pic'
          className='w-8 h-8 rounded-full'
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
            key={i}>
            {item.icon}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Footer;
