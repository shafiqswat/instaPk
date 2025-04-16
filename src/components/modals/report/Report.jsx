/** @format */

import React, { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { ReportModalData } from "@/constants";
import { useAuth } from "@/context/auth.context";

const Report = ({ showModal, setShowModal, selectedUser, selectedPost }) => {
  const { user, savePost, handleFollow, isFollow, setIsFollow } = useAuth();
  const [saved, setSaved] = useState(
    user?.favorites?.includes(selectedPost?.id)
  );

  useEffect(() => {
    if (selectedPost?._id && user?._id) {
      setSaved(user?.favorites?.includes(selectedPost?.id));
    }
  }, [selectedPost, user]);

  const handleFollowUnFollow = async () => {
    await handleFollow(user?._id, selectedUser?._id, isFollow, setIsFollow);
    setShowModal(false);
  };

  const toggleSave = () => {
    if (!selectedPost?._id || !user?._id) return;
    savePost(selectedPost._id, user._id, saved, setSaved);
  };

  const dummyHandlers = {
    handleReport: () => console.log("Report clicked"),
    handleGoToPost: () => console.log("Go to post clicked"),
    handleShare: () => console.log("Share clicked"),
    handleCopyLink: () => console.log("Copy link clicked"),
    handleEmbed: () => console.log("Embed clicked"),
    handleAboutAccount: () => console.log("About this account clicked"),
    handleCancel: () => setShowModal(false),
  };

  const modalItems = ReportModalData(toggleSave, saved, dummyHandlers);

  return (
    <div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        className='md:w-96 w-[80%]'>
        <ul className='text-center'>
          <li
            className='border-b p-3 text-sm cursor-pointer text-blue-500 font-semibold'
            onClick={handleFollowUnFollow}>
            {!isFollow[selectedUser?._id] ? "Follow" : "Unfollow"}
          </li>
          {modalItems.map((item, i) => (
            <li
              key={i}
              className={`border-b p-3 text-sm cursor-pointer ${
                item.text === "Report" || item.text === "Unfollow"
                  ? "text-red-500 font-semibold"
                  : ""
              }`}
              onClick={item.onclick}>
              {item.text}
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};

export default Report;
