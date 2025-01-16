/** @format */
"use client";
import { HurtIcon, MessengerIcon } from "@/constants/SvgIcon";
import React, { useState } from "react";
import DropdownMenuCustom from "../../form-items/dropdown/Dropdown";
import { ChevronDown, Star, UserRound } from "lucide-react";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className='flex justify-between items-center px-5 md:hidden overflow-hidden'>
      <div
        className='flex items-center'
        onClick={() => {
          setShowDropdown(true);
        }}>
        <img
          src='/icons/loginLogo.png'
          alt='login-login'
          className='invert w-[103px] h-auto my-5'
        />
        <ChevronDown className='w-5 h-5' />
      </div>
      <DropdownMenuCustom
        open={showDropdown}
        onOpenChange={setShowDropdown}
        className='w-32 mt-12 ml-4'>
        <div className='flex justify-around items-center mb-3 '>
          <p className=''>Following</p>
          <UserRound />
        </div>
        <div className='flex justify-around items-center'>
          <p className=''>Favorites</p>
          <Star />
        </div>
      </DropdownMenuCustom>
      <div className='flex gap-4'>
        <HurtIcon />
        <MessengerIcon />
      </div>
    </div>
  );
};

export default Header;
