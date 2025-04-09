/** @format */

"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FavoriteIcon } from "@/constants/SvgIcon";
import { Grid } from "lucide-react";
import Save from "@/app/(auth)/[slug]/save/page";
import MyPosts from "@/app/(auth)/[slug]/page";

const TabsCustom = ({ isCurrentUser, searchUser }) => {
  const { slug } = useParams();
  const router = useRouter();

  const [tab, setTab] = useState("posts");

  // Sync tab with URL on initial render
  useEffect(() => {
    const path = window.location.pathname;
    if (path.endsWith("/save")) {
      setTab("saved");
    } else {
      setTab("posts");
    }
  }, []);

  // Update tab + URL without reload
  const handleTabChange = (newTab) => {
    setTab(newTab);
    const basePath = `/${slug}`;
    router.push(newTab === "saved" ? `${basePath}/save` : basePath);
  };

  return (
    <div className='w-full mt-10 border-t'>
      <div className='flex gap-5 mt-4'>
        <button
          onClick={() => handleTabChange("posts")}
          className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
            tab === "posts"
              ? "bg-gray-100 text-black"
              : "text-gray-500 hover:text-black"
          }`}>
          <Grid className='w-4 h-4 mr-1' />
          POSTS
        </button>
        <button
          onClick={() => handleTabChange("saved")}
          className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
            tab === "saved"
              ? "bg-gray-100 text-black"
              : "text-gray-500 hover:text-black"
          }`}>
          <FavoriteIcon className='w-4 h-4 mr-1' />
          SAVED
        </button>
      </div>

      <div className='mt-6'>
        {tab === "posts" && (
          <MyPosts
            isCurrentUser={isCurrentUser}
            searchUser={searchUser}
          />
        )}
        {tab === "saved" && <Save selectedUser={searchUser} />}
      </div>
    </div>
  );
};

export default TabsCustom;
