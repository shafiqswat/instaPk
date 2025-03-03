/** @format */
"use client";
import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import Search from "../../search/Search";
import { usePathname } from "next/navigation";

const SidebarWrapper = () => {
  const [width, setWidth] = useState(false);
  const [search, setSearch] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const wrapperRef = useRef(null);
  const pathName = usePathname();

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsMediumScreen(screenWidth >= 768 && screenWidth <= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = () => {
    if (isMediumScreen || pathName === "/message") {
      // Only toggle search for medium screens and the message page
      setSearch((prev) => !prev);
    } else {
      // Toggle both sidebar and search for other pages
      setWidth((prev) => !prev);
      setSearch((prev) => !prev);
    }
  };

  useEffect(() => {
    if (pathName === "/message") {
      setWidth(true); // Always true on the message page
      setSearch(false);
    } else {
      setWidth(isMediumScreen ? true : false);
      setSearch(false);
    }
  }, [pathName, isMediumScreen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        if (isMediumScreen || pathName === "/message") {
          setSearch(false); // Close search only
        } else {
          setWidth(false);
          setSearch(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pathName, isMediumScreen]);

  return (
    <div
      className={`${
        pathName === "/message" ? "w-[73px]" : "min-w-[18%]"
      } md:block hidden`}
      ref={wrapperRef}>
      <Sidebar
        handleClick={handleClick}
        width={width}
      />
      <div
        className={`transition-all absolute z-20 duration-500 ease-in-out ${
          search ? "w-[43%]" : "w-0"
        } overflow-hidden`}>
        <Search />
      </div>
    </div>
  );
};

export default SidebarWrapper;
