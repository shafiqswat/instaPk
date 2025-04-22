/** @format */

import React, { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { usePost } from "@/context/post.context";
import FilePreview from "../filePreview/FilePreview";
import { useRouter } from "next/navigation";
import Share from "../share/Share";
import AccountInformation from "../accountInformation/AccountInformation";
import { toast } from "@/hooks/use-toast";

const UpdatePost = ({
  showModal,
  setShowModal,
  postId,
  preview,
  user,
  caption,
  setCommentModal,
}) => {
  const [editModal, setEditModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [captionValue, setCaptionValue] = useState(caption);
  const [accountModal, setAccountModal] = useState(false);
  const { deletePost, updatedPost } = usePost();
  const router = useRouter();

  useEffect(() => {
    setCaptionValue(caption);
  }, [editModal]);
  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      await deletePost(postId, user?._id);
    } catch (err) {
      console.log(err);
    } finally {
      setCommentModal(false);
    }
  };
  const handleEdit = (postId) => {
    updatedPost(postId, {
      caption: captionValue,
      isPublic: true,
    });
    setEditModal(false);
  };

  const updateModalData = [
    { text: "Delete", action: handleDeletePost },
    {
      text: "Edit",
      action: () => {
        setEditModal(true);
        setShowModal(false);
      },
    },
    {
      text: "Hide like count to others",
      action: () => console.log("Hide like count clicked"),
    },
    {
      text: "Turn off commenting",
      action: () => console.log("Turn off commenting clicked"),
    },
    { text: "Go to post", action: () => router.push(`/p/${postId}`) },
    {
      text: "Share to...",
      action: () => setShareModal(true),
    },
    {
      text: "Copy link",
      action: () => {
        navigator.clipboard.writeText(
          `https://insta-pk.vercel.app/p/${postId}`
        ),
          toast({
            title: "Post Link Copy",
            description: "Post Link Copy Successfully.",
            variant: "success",
            duration: 2000,
          });
      },
    },
    { text: "Embed", action: () => console.log("Embed clicked") },
    {
      text: "About this account",
      action: () => setAccountModal(true),
    },
    { text: "Cancel", action: () => setShowModal(false) },
  ];
  return (
    <div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        className='w-96 gap-0 overflow-hidden'>
        <ul>
          {updateModalData.map((item, i) => (
            <li
              className={`text-center border-b p-3 text-sm ${
                item.text === "Delete" ? "text-red-500 font-semibold" : ""
              }`}
              key={i}>
              <button onClick={item.action}>{item.text}</button>
            </li>
          ))}
        </ul>
        <Share
          showModal={shareModal}
          setShowModal={setShareModal}
        />
        <AccountInformation
          showModal={accountModal}
          setShowModal={setAccountModal}
          selectedUser={user}
        />
      </Modal>

      <Modal
        showModal={editModal}
        setShowModal={setEditModal}
        className='overflow-hidden min-w-[750px]'>
        <div className='flex justify-between p-3 border-b'>
          <button
            className='text-sm'
            onClick={() => setEditModal(false)}>
            Cancel
          </button>
          <h2 className='text-sm font-semibold'>Edit info</h2>
          <button
            className='text-blue-500 font-semibold text-sm'
            onClick={() => handleEdit(postId)}>
            Done
          </button>
        </div>

        <FilePreview
          preview={preview}
          caption={true}
          user={user}
          captionValue={captionValue}
          setCaptionValue={setCaptionValue}
        />
      </Modal>
    </div>
  );
};

export default UpdatePost;
