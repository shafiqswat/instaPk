/** @format */

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  CreateIcon,
  CreatePostIcon,
  ExploreIcon,
  HomeIcon,
  HurtIcon,
  InstagramIcon,
  MessengerIcon,
  MoreIcon,
  ReelsIcon,
  SearchIcon,
} from "@/constants/SvgIcon";
import { useAuth } from "@/context/auth.context";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import Post from "@/components/cards/post/Post";
import { Settings } from "lucide-react";
import { usePathname } from "next/navigation";

const Sidebar = ({ handleClick, width }) => {
  const { user, signOut } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const [createPost, setCreatePost] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const sidebarData = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    {
      text: "Search",
      icon: <SearchIcon className='w-6 h-6' />,
      path: "#",
      className: "border",
      onClick: () => handleClick(),
    },
    { text: "Explore", icon: <ExploreIcon />, path: "/explore" },
    { text: "Reels", icon: <ReelsIcon className='w-6 h-6' />, path: "/reels" },
    { text: "Messages", icon: <MessengerIcon />, path: "/message" },
    { text: "Notifications", icon: <HurtIcon />, path: "/notifications" },
    { text: "Create", icon: <CreateIcon />, path: "#" },
    {
      text: "Profile",
      path: `/${user?.userName}`,
      avatar: true,
      ImgPath: `${user?.profilePic}`,
    },
    { text: "More", icon: <MoreIcon />, path: "#" },
  ];

  const handleSignOut = () => {
    signOut();
  };

  if (!isClient) {
    return null;
  }

  return (
    <div
      className={`border-r fixed z-30 p-3 h-screen ${
        width ? "w-[73px]" : "w-[18%]"
      }`}
      style={{
        transition: "width 0.3s ease-in-out",
      }}>
      {/* Logo */}
      <div className={`${width ? "p-3" : "p-2"} h-[64px] mt-3`}>
        {width ? (
          <InstagramIcon className='w-[40px] h-[40px]' />
        ) : (
          <img
            src='/icons/loginLogo.png'
            alt='login-logo'
            className='invert w-[103px] h-auto'
          />
        )}
      </div>

      {/* Sidebar Items */}
      <ul className='flex flex-col mt-2'>
        {sidebarData.map((items, i) => (
          <li
            key={i}
            className={`p-3 rounded mb-2 hover:bg-gray-200 ${
              items.text === "More" ? "mt-5" : ""
            } ${pathname === items.path ? "bg-gray-300 font-bold" : ""}`} // Active class
            onClick={items.onClick}>
            {items.text === "Create" || items.text === "More" ? (
              <Popover>
                <PopoverTrigger asChild>
                  <button className='flex items-center gap-4 w-full'>
                    <span className='w-6 h-6'>{items.icon}</span>
                    {!width && <span>{items.text}</span>}
                  </button>
                </PopoverTrigger>
                <PopoverContent className='w-56 p-0'>
                  {items.text === "Create" ? (
                    <div
                      className='flex justify-between hover:bg-gray-100 p-3 cursor-pointer'
                      onClick={() => setCreatePost(true)}>
                      <p>Post</p>
                      <span>
                        <CreatePostIcon />
                      </span>
                    </div>
                  ) : (
                    <div className='p-1'>
                      <div className='flex items-center p-3 gap-2 cursor-pointer hover:bg-gray-200 rounded'>
                        <Settings />
                        <p className='text-sm'>Settings</p>
                      </div>
                      <div className='p-3 cursor-pointer hover:bg-gray-200 rounded'>
                        <p
                          className='text-sm'
                          onClick={handleSignOut}>
                          Log out
                        </p>
                      </div>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            ) : (
              <Link
                href={items.path}
                className='flex items-center gap-4'>
                {items.avatar ? (
                  <img
                    src={items.ImgPath || "/icons/avatar.jpg"}
                    alt='user'
                    className='w-6 h-6 rounded-full'
                  />
                ) : (
                  <span className='w-6 h-6 rounded-full'>{items.icon}</span>
                )}
                {!width && <span>{items.text}</span>}
              </Link>
            )}
          </li>
        ))}
      </ul>

      {/* Post Modal */}
      <Post
        showModal={createPost}
        setShowModal={setCreatePost}
      />
    </div>
  );
};

export default Sidebar;
