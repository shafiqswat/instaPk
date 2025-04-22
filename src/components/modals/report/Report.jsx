/** @format */

import React, { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { ReportModalData } from "@/constants";
import { useAuth } from "@/context/auth.context";
import { useRouter } from "next/navigation";
import Share from "../share/Share";
import { toast } from "@/hooks/use-toast";
import AccountInformation from "../accountInformation/AccountInformation";

const Report = ({ showModal, setShowModal, selectedUser, selectedPost }) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAccountInformationModal, setShowAccountInformationModal] =
    useState(false);
  const router = useRouter();
  const { user, savePost, handleFollow, isFollow, setIsFollow } = useAuth();
  const [saved, setSaved] = useState(
    user?.favorites?.includes(selectedPost?.id)
  );

  useEffect(() => {
    if (selectedPost?.id && user?._id) {
      setSaved(user?.favorites?.includes(selectedPost?.id));
    }
  }, [selectedPost, user]);

  const toggleSave = () => {
    if (!selectedPost?.id || !user?._id) return;
    savePost(selectedPost.id, user?._id, saved, setSaved);
    console.log("save is Clicked");
  };

  const dummyHandlers = {
    handleReport: () => console.log("Report clicked"),
    handleFollowUnFollow: () => {
      setShowModal(false);
      handleFollow(user?._id, selectedUser?._id, isFollow, setIsFollow);
    },
    handleGoToPost: () => {
      router.push(`/p/${selectedPost?.id}`);
      setShowModal(false);
    },
    handleShare: () => {
      setShowShareModal(true);
    },
    handleCopyLink: () => {
      navigator.clipboard.writeText(
        `https://insta-pk.vercel.app/${selectedPost?.id}`
      );
      toast({
        title: "Post Link Copy",
        description: "Post Link Copy Successfully.",
        variant: "success",
        duration: 2000,
      });
    },
    handleEmbed: () => console.log("Embed clicked"),
    handleAboutAccount: () => {
      setShowAccountInformationModal(true);
    },
    handleCancel: () => setShowModal(false),
  };

  const modalItems = ReportModalData(
    toggleSave,
    saved,
    dummyHandlers,
    isFollow,
    selectedUser
  );

  return (
    <div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        className='md:w-96 w-[80%] h-fit gap-0 border overflow-hidden'>
        <ul className='text-center'>
          {modalItems.map((item, i) => (
            <li
              key={item.text + i}
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
        <Share
          showModal={showShareModal}
          setShowModal={setShowShareModal}
          postId={selectedPost?.id}
        />
        <AccountInformation
          showModal={showAccountInformationModal}
          setShowModal={setShowAccountInformationModal}
          selectedUser={selectedPost?.user}
        />
      </Modal>
    </div>
  );
};

export default Report;
