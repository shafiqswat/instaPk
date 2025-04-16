/** @format */
import Post from "@/components/cards/createPost/createPost";
import {
  CreateIcon,
  ExploreIcon,
  HomeIcon,
  MessengerIcon,
  ReelsIcon,
} from "@/constants/SvgIcon";
import { useAuth } from "@/context/auth.context";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const pathName = usePathname();

  const icons = [
    {
      icon: (
        <HomeIcon className='w-7 h-7 transition-transform hover:scale-110' />
      ),
      href: "/",
    },
    {
      icon: (
        <ExploreIcon className='w-7 h-7 transition-transform hover:scale-110' />
      ),
      href: "/explore",
    },
    {
      icon: (
        <div className='p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg hover:scale-110 transition'>
          <CreateIcon className='w-7 h-7 text-white' />
        </div>
      ),
      href: "#",
      click: () => setShowModal(true),
    },
    {
      icon: (
        <ReelsIcon className='w-7 h-7 transition-transform hover:scale-110' />
      ),
      href: "/reels",
    },
    {
      icon: (
        <MessengerIcon className='w-7 h-7 transition-transform hover:scale-110' />
      ),
      href: "/message",
    },
    {
      icon: (
        <Image
          src={user?.profilePic}
          width={32}
          height={32}
          alt='User Profile'
          className='w-8 h-8 rounded-full border-2 border-blue-500 hover:scale-110 transition-transform'
        />
      ),
      href: `/${user?.userName}`,
    },
  ];

  return (
    <div className='bg-white block sm:hidden h-14 fixed bottom-0 left-0 right-0 shadow-xl border-t border-gray-200'>
      <nav className='flex items-center justify-around h-full px-5 bg-gradient-to-r from-gray-100 to-white'>
        {icons.map((item, i) => (
          <Link
            href={item.href}
            key={i}
            onClick={item.click}
            className={`p-2 rounded-full transition-all ${
              pathName === item.href
                ? "bg-gray-300 font-bold"
                : "hover:bg-gray-200"
            }`}>
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
