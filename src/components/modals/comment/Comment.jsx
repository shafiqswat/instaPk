/** @format */

import React, { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import CarouselCustom from "../../carousel/Carousel";
import HoverCardCustom from "../../cards/hoverCard/HoverCard";
import {
  HurtIcon,
  StarIcon,
  ThreeDotsIcon,
  VerifyIcon,
} from "@/constants/SvgIcon";
import { useAuth } from "@/context/auth.context";
import UpdatePost from "../updatePost/UpdatePost";
import LoadingSkeleton from "@/components/elements/loading-skeleton/loadingSkeleton";
import Report from "../report/Report";
import CommentsForm from "@/components/form-items/commentsForm/CommentsForm";
import { useRouter } from "next/navigation";
import { useComments } from "@/context/comments.context";
import DeleteComments from "../deleteComments/deleteComments";
import Image from "next/image";

const Comment = ({ showModal, setShowModal, postData, selectedUser }) => {
  const { loading: commentsLoading, fetchComments, comments } = useComments();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const router = useRouter();
  const {
    user,
    singleUser,
    loading: userLoading,
    handleFollow,
    setIsFollow,
    isFollow,
  } = useAuth();

  useEffect(() => {
    if (postData) {
      {
        singleUser(postData?.postBy);
      }
    }
  }, [postData]);

  useEffect(() => {
    fetchComments(postData?.id);
  }, [showModal]);

  const handleDeleteClick = (commentId, commentedUser) => {
    console.log(commentedUser.user, "comments User");
    if (commentedUser.user._id === user._id) {
      setCommentToDelete(commentId);
      setDeleteModal(true);
    }
  };

  const isCurrentUser = selectedUser?._id === user?._id;
  return (
    <div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        className='md:grid md:grid-cols-2 gap-0 md:min-w-[80%]  border-0'>
        <div className='min-w-full min-h-full md:block hidden bg-black p-2'>
          <CarouselCustom postData={postData}>
            {postData?.imageUrls?.map((img, i) => (
              <Image
                key={i}
                src={img}
                width={1200}
                height={600}
                alt={`slider ${i + 1}`}
                className='min-w-full h-[600px] object-cover'
                onClick={() => router.push(`/${postData?.user.userName}`)}
              />
            ))}
          </CarouselCustom>
        </div>
        <div className='w-full bg-white '>
          {userLoading ? (
            <LoadingSkeleton comments={true} />
          ) : (
            <div className='flex items-center gap-3 border-b p-4  w-full'>
              <HoverCardCustom userData={postData?.user}>
                <Image
                  src={postData?.user?.profilePic}
                  alt='pcb'
                  width={32}
                  height={32}
                  className='w-8 h-8 rounded-full cursor-pointer'
                />
              </HoverCardCustom>
              <div className='flex items-center gap-1'>
                <HoverCardCustom userData={postData?.user}>
                  <h2 className='font-semibold text-sm text-[#262626] hover:text-gray-600 cursor-pointer'>
                    {postData?.user?.userName}
                  </h2>
                </HoverCardCustom>
                <VerifyIcon />
                {!isCurrentUser && (
                  <>
                    {!isFollow[selectedUser?._id] && (
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
                  </>
                )}
              </div>
              <div className='ms-auto flex items-center gap-6'>
                <StarIcon />
                <ThreeDotsIcon
                  className='hover:text-gray-500'
                  onClick={() => {
                    isCurrentUser
                      ? setShowUpdateModal(true)
                      : setShowReportModal(true);
                  }}
                />
              </div>
            </div>
          )}
          <div className='comment scroll-auto h-96 border overflow-y-scroll'>
            {commentsLoading ? (
              <>
                {Array.from({ length: 6 }, (_, i) => {
                  return (
                    <LoadingSkeleton
                      key={i}
                      comments={true}
                    />
                  );
                })}
              </>
            ) : (
              <>
                {comments &&
                  comments?.map((items, i) => (
                    <div
                      className='p-4 flex gap-4 group'
                      key={i}>
                      <HoverCardCustom userData={items.user}>
                        <Image
                          src={items?.user?.profilePic}
                          width={32}
                          height={32}
                          alt='comments'
                          className='w-8 h-8 rounded-full cursor-pointer'
                        />
                      </HoverCardCustom>
                      <div>
                        <div className='text-sm'>
                          <HoverCardCustom userData={items?.user}>
                            <span className='font-semibold text-sm mr-2 text-[#262626] cursor-pointer'>
                              {items?.user?.userName}
                            </span>
                          </HoverCardCustom>
                          {items?.comment}
                        </div>
                        <div className='text-xs text-gray-500 font-semibold flex items-center gap-2 group'>
                          <span className='cursor-pointer'>1d</span>
                          <span className='cursor-pointer'>25 likes</span>
                          <span className='cursor-pointer'>Reply</span>
                          <span
                            className='opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity'
                            onClick={() =>
                              handleDeleteClick(items?._id, items)
                            }>
                            <ThreeDotsIcon />
                          </span>
                        </div>
                      </div>
                      <HurtIcon />
                    </div>
                  ))}
              </>
            )}
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
      </Modal>
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
