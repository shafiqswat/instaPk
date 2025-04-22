/** @format */

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
export const ReportModalData = (
  toggleSave,
  saved,
  dummyHandlers,
  isFollow,
  selectedUser
) => [
  { text: "Report", onclick: dummyHandlers.handleReport },
  {
    text: !isFollow[selectedUser?._id] ? "Follow" : "Unfollow",
    onclick: dummyHandlers.handleFollowUnFollow,
  },
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
