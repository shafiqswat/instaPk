/** @format */
// import { useAuth } from "@/context/AuthContext";
// const { user } = useAuth();

import {
  CreateIcon,
  ExploreIcon,
  HomeIcon,
  HurtIcon,
  MessengerIcon,
  MoreIcon,
  ReelsIcon,
  SearchIcon,
} from "./SvgIcon";

//login Page Links Data
export const LinksData = [
  { text: "Meta", href: "" },
  { text: "About", href: "" },
  { text: "Blog", href: "" },
  { text: "Jobs", href: "" },
  { text: "Help", href: "" },
  { text: "API", href: "" },
  { text: "Privacy", href: "" },
  { text: "Terms", href: "" },
  { text: "Locations", href: "" },
  { text: "Instagram Lite", href: "" },
  { text: "Threads", href: "" },
  { text: "Contact Uploading & Non-Users", href: "" },
  { text: "Meta Verified", href: "" },
];
export const footerData = [
  {
    text: "About",
    href: "",
  },
  {
    text: "Help",
    href: "",
  },
  {
    text: "API",
    href: "",
  },
  {
    text: "Jobs",
    href: "",
  },
  {
    text: "Privacy",
    href: "",
  },
  {
    text: "Terms",
    href: "",
  },
  {
    text: "Locations",
    href: "",
  },
  {
    text: "Language",
    href: "",
  },
  {
    text: "Meta Verified",
    href: "",
  },
];

export const suggestionDeskTopData = [
  {
    imgPath: "/icons/avatar1.jpeg",
    userName: "shafiqkhdev",
    name: "Muhammad shafiq",
    text: "Switch",
    onclick: () => handleClick(),
  },
  {
    seeAll: true,
    text: "See All",
    className: "text-black hover:text-gray-400",
  },
  {
    imgPath: "/user/user1.jpg",
    userName: "shahiikd",
    name: "Suggested for you",
    text: "Follow",
    onclick: () => handleClick(),
  },
  {
    imgPath: "/user/user2.jpg",
    userName: "sohailiqbal916",
    name: "Suggested for you",
    text: "Follow",
    onclick: () => handleClick(),
  },
  {
    imgPath: "/user/user3.jpg",
    userName: "noora.ali9667",
    name: "Suggested for you",
    text: "Follow",
    onclick: () => handleClick(),
  },
  {
    imgPath: "/user/user4.jpg",
    userName: "sohail_22_crktr",
    name: "Suggested for you",
    text: "Follow",
    onclick: () => handleClick(),
  },
];

export const ReportModalData = (toggleSave, saved, dummyHandlers) => [
  { text: "Report", onclick: dummyHandlers.handleReport },
  {
    text: saved ? "Remove from favorites" : "Add to favorites",
    onclick: toggleSave,
  },
  { text: "Go to post", onclick: dummyHandlers.handleGoToPost },
  { text: "Share to...", onclick: dummyHandlers.handleShare },
  { text: "Copy link", onclick: dummyHandlers.handleCopyLink },
  { text: "Embed", onclick: dummyHandlers.handleEmbed },
  { text: "About this account", onclick: dummyHandlers.handleAboutAccount },
  { text: "Cancel", onclick: dummyHandlers.handleCancel },
];

// export const sidebarData = [
//   { text: "Home", icon: <HomeIcon />, path: "/" },
//   {
//     text: "Search",
//     icon: <SearchIcon className='w-6 h-6' />,
//     path: "",
//     className: "border",
//     onClick: () => handleClick(),
//   },
//   { text: "Explore", icon: <ExploreIcon />, path: "/explore" },
//   { text: "Reels", icon: <ReelsIcon className='w-6 h-6' />, path: "/reels" },
//   { text: "Messages", icon: <MessengerIcon />, path: "/inbox" },
//   { text: "Notifications", icon: <HurtIcon />, path: "" },
//   { text: "Create", icon: <CreateIcon />, path: "" },
//   {
//     text: "Profile",
//     path: `/${user?.userName}`,
//     avatar: true,
//     ImgPath: `${user?.profilePic}`,
//   },
//   { text: "More", icon: <MoreIcon />, path: "" },
// ];
