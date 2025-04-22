/** @format */
"use client";
import { HurtIcon, MessengerIcon } from "@/constants/SvgIcon";
import React, { useState } from "react";
import DropdownMenuCustom from "../../form-items/dropdown/Dropdown";
import { ChevronDown, Star, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/auth.context";
import Followers from "@/components/modals/followers/Followers";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const { user } = useAuth();

  const router = useRouter();
  return (
    <>
      <div className='flex justify-between items-center px-5 md:hidden overflow-hidden'>
        <div
          className='flex items-center'
          onClick={() => {
            setShowDropdown(true);
          }}>
          <Image
            src='/icons/loginLogo.png'
            width={103}
            height={10}
            alt='login-login'
            className='invert w-[103px] h-auto my-5'
          />
          <ChevronDown className='w-5 h-5' />
        </div>
        {showDropdown && (
          <DropdownMenuCustom
            open={showDropdown}
            onOpenChange={setShowDropdown}
            className='w-32 mt-12 ml-4'>
            <div
              className='flex justify-around items-center mb-3 '
              onClick={() => {
                setShowFollowers(true);
                setIsFollowing(true);
                setShowDropdown(false);
              }}>
              <p className=''>Following</p>
              <UserRound />
            </div>
            <div
              className='flex justify-around items-center'
              onClick={() => router.push(`/${user?.userName}/save`)}>
              <p className=''>Favorites</p>
              <Star />
            </div>
          </DropdownMenuCustom>
        )}
        <div className='flex gap-4'>
          <HurtIcon />
          <MessengerIcon onClick={() => router.push("/message")} />
        </div>
      </div>
      <Followers
        isFollowing={isFollowing}
        showModal={showFollowers}
        setShowModal={setShowFollowers}
        user={user}
        isCurrentUser={true}
      />
    </>
  );
};

export default Header;
