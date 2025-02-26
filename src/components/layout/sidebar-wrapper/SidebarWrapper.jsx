/** @format */
"use client";
import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import Search from "../../search/Search";
import { usePathname } from "next/navigation";

const SidebarWrapper = () => {
  const [width, setWidth] = useState(false);
  const [search, setSearch] = useState(false);
  const wrapperRef = useRef(null);
  const pathName = usePathname();

  const handleClick = () => {
    if (pathName !== "/message") {
      setWidth((prev) => !prev);
      setSearch((prev) => !prev);
    }
  };

  useEffect(() => {
    if (pathName === "/message") {
      setWidth(true); // Always true on "/message"
      setSearch(false); // Ensure search remains closed
    } else {
      setWidth(false); // Reset width when not on "/message"
    }
  }, [pathName]);

  // Detect clicks outside the wrapper
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        pathName !== "/message" &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setWidth(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pathName]);

  return (
    <div
      className={`${
        pathName === "/message" ? "w-[6%]" : "w-[22%]"
      } md:block hidden`}
      ref={wrapperRef}>
      <Sidebar
        handleClick={handleClick}
        width={width}
      />
      <div
        className={`transition-all absolute z-20 duration-500 ease-in-out ${
          search && width && pathName !== "/message" ? "w-[43%]" : "w-0"
        } overflow-hidden`}>
        <Search />
      </div>
    </div>
  );
};

export default SidebarWrapper;
