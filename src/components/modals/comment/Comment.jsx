/** @format */

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Modal from "../modal/Modal";
import CarouselCustom from "../../carousel/Carousel";
import HoverCardCustom from "../../cards/hoverCard/HoverCard";
import UpdatePost from "../updatePost/UpdatePost";
import Report from "../report/Report";
import CommentsForm from "@/components/form-items/commentsForm/CommentsForm";
import DeleteComments from "../deleteComments/deleteComments";
import LoadingSkeleton from "@/components/elements/loading-skeleton/loadingSkeleton";

import {
  HurtIcon,
  StarIcon,
  ThreeDotsIcon,
  VerifyIcon,
} from "@/constants/SvgIcon";

import { useAuth } from "@/context/auth.context";
import { useComments } from "@/context/comments.context";

const Comment = ({
  showModal,
  setShowModal,
  postData,
  selectedUser,
  postPage,
}) => {
  const {
    user,
    singleUser,
    loading: userLoading,
    handleFollow,
    setIsFollow,
    isFollow,
  } = useAuth();
  const { loading: commentsLoading, fetchComments, comments } = useComments();

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const isCurrentUser = selectedUser?._id === user?._id;

  useEffect(() => {
    if (postData) singleUser(postData?.postBy);
  }, [postData]);

  useEffect(() => {
    fetchComments(postData?.id);
  }, [showModal]);

  const handleDeleteClick = (commentId, commentedUser) => {
    if (commentedUser.user._id === user._id) {
      setCommentToDelete(commentId);
      setDeleteModal(true);
    }
  };

  const renderComments = () => {
    if (commentsLoading) {
      return Array.from({ length: 6 }, (_, i) => (
        <LoadingSkeleton
          key={i}
          comments={true}
        />
      ));
    }

    return (
      comments &&
      comments?.map((comment, i) => (
        <div
          key={i}
          className='p-4 flex gap-4 group'>
          <HoverCardCustom userData={comment.user}>
            <Image
              src={comment?.user?.profilePic}
              width={32}
              height={32}
              alt='comments'
              className='w-8 h-8 rounded-full cursor-pointer'
            />
          </HoverCardCustom>
          <div>
            <div className='text-sm'>
              <HoverCardCustom userData={comment.user}>
                <span className='font-semibold text-sm mr-2 text-[#262626] cursor-pointer'>
                  {comment.user.userName}
                </span>
              </HoverCardCustom>
              {comment.comment}
            </div>
            <div className='text-xs text-gray-500 font-semibold flex items-center gap-2 group'>
              <span className='cursor-pointer'>1d</span>
              <span className='cursor-pointer'>25 likes</span>
              <span className='cursor-pointer'>Reply</span>
              <span
                className='opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity'
                onClick={() => handleDeleteClick(comment._id, comment)}>
                <ThreeDotsIcon />
              </span>
            </div>
          </div>
          <HurtIcon />
        </div>
      ))
    );
  };

  const commentsContent = (
    <div className='md:h-full md:flex'>
      <div className='min-w-full bg-black p-2'>
        <CarouselCustom postData={postData}>
          {postData?.imageUrls?.map((img, i) => (
            <Image
              key={i}
              src={img}
              width={1200}
              height={600}
              alt={`slider ${i + 1}`}
              className='h-[600px]'
            />
          ))}
        </CarouselCustom>
      </div>

      <div className='min-w-full bg-white'>
        {userLoading ? (
          <LoadingSkeleton comments={true} />
        ) : (
          <div className='flex items-center gap-3 border-b p-4 w-full'>
            <HoverCardCustom userData={postData?.user}>
              {postData?.user?.profilePic && (
                <Image
                  src={postData.user.profilePic}
                  alt='pcb'
                  width={32}
                  height={32}
                  className='w-8 h-8 rounded-full cursor-pointer'
                />
              )}
            </HoverCardCustom>

            <div className='flex items-center gap-1'>
              <HoverCardCustom userData={postData?.user}>
                <h2 className='font-semibold text-sm text-[#262626] hover:text-gray-600 cursor-pointer'>
                  {postData?.user?.userName}
                </h2>
              </HoverCardCustom>
              <VerifyIcon />
              {!isCurrentUser && !isFollow[selectedUser?._id] && (
                <button
                  className='text-sm font-semibold text-sky-500 ms-2'
                  onClick={() =>
                    handleFollow(
                      user?._id,
                      selectedUser?._id,
                      isFollow,
                      setIsFollow
                    )
                  }>
                  Follow
                </button>
              )}
            </div>

            <div className='ms-auto flex items-center gap-6'>
              <StarIcon />
              <ThreeDotsIcon
                className='hover:text-gray-500'
                onClick={() =>
                  isCurrentUser
                    ? setShowUpdateModal(true)
                    : setShowReportModal(true)
                }
              />
            </div>
          </div>
        )}

        <div className='comment h-96 overflow-y-scroll border'>
          {renderComments()}
        </div>

        <CommentsForm
          user={isCurrentUser ? user : postData?.user}
          items={postData}
          textareaStyle='px-10 relative'
          IconStyle='w-5 h-5'
          pickerStyle='bottom-20'
          IconParentStyle='left-2 top-1 absolute'
          iconsContainerStyle='p-2'
        />
      </div>
    </div>
  );

  return (
    <div>
      {postPage ? (
        <div className='md:grid md:grid-cols-2 gap-0 w-[80%] mx-auto border my-5'>
          {commentsContent}
        </div>
      ) : (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          className='md:grid md:grid-cols-2 gap-0 md:min-w-[80%] border-0'>
          {commentsContent}
        </Modal>
      )}

      <UpdatePost
        setCommentModal={setShowModal}
        showModal={showUpdateModal}
        setShowModal={setShowUpdateModal}
        postId={postData?.id}
        preview={postData?.imageUrls}
        user={user}
        caption={postData?.caption}
        postData={postData}
      />

      <Report
        showModal={showReportModal}
        setShowModal={setShowReportModal}
        setIsFollow={setIsFollow}
        selectedUser={selectedUser}
        selectedPost={postData}
      />

      <DeleteComments
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        postId={postData?.id}
        commentId={commentToDelete}
      />
    </div>
  );
};

export default Comment;
