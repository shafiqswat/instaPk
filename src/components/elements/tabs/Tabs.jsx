/** @format */

"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FavoriteIcon, ReelsIcon } from "@/constants/SvgIcon";
import { Contact, Grid } from "lucide-react";
import Save from "@/app/(auth)/[slug]/save/page";
import MyPosts from "@/app/(auth)/[slug]/page";
import UserReels from "@/app/(auth)/[slug]/reels/page";
import Tagged from "@/app/(auth)/[slug]/tagged/page";

const TabsCustom = ({ isCurrentUser, searchUser }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [tab, setTab] = useState("posts");

  const tabsData = [
    {
      value: "posts",
      label: "POSTS",
      icon: Grid,
      content: (
        <MyPosts
          isCurrentUser={isCurrentUser}
          searchUser={searchUser}
        />
      ),
      path: `/${searchUser?.userName}`,
    },
    {
      value: "reels",
      label: "REELS",
      icon: ReelsIcon,
      content: <UserReels />,
      path: `/${searchUser?.userName}/reels`,
    },
    {
      value: "saved",
      label: "SAVED",
      icon: FavoriteIcon,
      content: <Save selectedUser={searchUser} />,
      path: `/${searchUser?.userName}/save`,
    },
    {
      value: "tagged",
      label: "TAGGED",
      icon: Contact,
      content: <Tagged />,
      path: `/${searchUser?.userName}/tagged`,
    },
  ];

  useEffect(() => {
    const currentTab = tabsData.find(
      (tab) => pathname.endsWith(tab.value) || pathname === tab.path
    );
    setTab(currentTab?.value || "posts");
  }, [pathname]);

  const handleTabChange = (newTab) => {
    setTab(newTab);
    const selected = tabsData.find((t) => t.value === newTab);
    if (selected) {
      router.push(selected.path);
    }
  };

  return (
    <Tabs
      value={tab}
      onValueChange={handleTabChange}
      className='w-full mt-10 border-t'>
      <TabsList className='flex gap-5'>
        {tabsData.map(({ value, label, icon: Icon }) => (
          <TabsTrigger
            key={value}
            value={value}>
            <span>
              <Icon className='w-4 h-4 mr-1' />
            </span>
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabsData.map(({ value, content }) => (
        <TabsContent
          key={value}
          value={value}>
          {content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TabsCustom;
