/** @format */
"use client";
import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import Search from "../../search/Search";

const SidebarWrapper = () => {
  const [width, setWidth] = useState(false);
  const wrapperRef = useRef(null);
  const handleClick = () => {
    setWidth(!width);
  };

  // Detect clicks outside the wrapper
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setWidth(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className='w-[22%] md:block hidden'
      ref={wrapperRef}>
      <Sidebar
        handleClick={handleClick}
        width={width}
      />
      <div
        className={`transition-all absolute z-20 duration-500 ease-in-out ${
          width ? "w-[43%]" : "w-0"
        } overflow-hidden`}>
        <Search />
      </div>
    </div>
  );
};

export default SidebarWrapper;
