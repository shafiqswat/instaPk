/** @format */
"use client";
import Share from "@/components/modals/share/Share";
import {
  CommentsIcon,
  FavoriteIcon,
  HurtIcon,
  ShareIcon,
} from "@/constants/SvgIcon";

import React, { useEffect, useState } from "react";
import TextArea from "../textarea/TextArea";
import useCompactTimeFormat from "@/components/hooks/useCompactTimeFormat";
import { useComments } from "@/context/commentsContext";
import { useAuth } from "@/context/AuthContext";
import { useLike } from "@/context/likeContext";

const CommentsForm = ({
  items,
  homePage,
  handleModal,
  textareaStyle,
  IconStyle,
  pickerStyle,
  IconParentStyle,
  btnStyle,
  iconsContainerStyle,
  textareaContainer,
}) => {
  const { user } = useAuth();
  const [postData, setPostData] = useState(items);
  const [showShareModal, setShowShareModal] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const { addComment } = useComments();
  const { savePost } = useAuth();
  const {
    handleLike,
    handleUnlike,
    isPostLiked,
    getLikeCount,
    fetchLikeStatus,
  } = useLike();
  const [isSavePost, setIsSavePost] = useState(
    user?.favorites?.includes(postData?._id)
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const formattedTime = useCompactTimeFormat(postData?.createdAt);

  useEffect(() => {
    if (postData?.id && user?._id) {
      fetchLikeStatus(postData.id, user._id);
      setIsSavePost(user?.favorites?.includes(postData?.id));
    }
  }, [postData, user]);

  const handleLikePost = async () => {
    if (!postData?.id || !user?._id) return;
    try {
      const updatedData = isPostLiked(postData.id)
        ? await handleUnlike(postData.id, user._id)
        : await handleLike(postData.id, user._id);
      setPostData((prev) => ({
        ...prev,
        likeCount: updatedData.likeCount,
      }));
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  const handleCommentPost = (e) => {
    e.preventDefault();
    if (!postData?.id || !user?._id || !commentValue.trim()) return;
    addComment(postData.id, user, commentValue);
    setCommentValue("");
  };

  const handleSavePost = () => {
    if (!postData?.id || !user?._id) return;
    savePost(postData.id, user._id, isSavePost, setIsSavePost);
  };

  const currentLikeCount =
    getLikeCount(postData?.id) || postData?.likeCount || 0;
  const isLiked = isPostLiked(postData?.id);
  const caption = isExpanded
    ? postData.caption
    : postData?.caption?.slice(0, 100);
  const showMore = !isExpanded && postData?.caption?.length > 100;

  return (
    <div className='w-full'>
      <div className={`py-2 ${iconsContainerStyle}`}>
        <div className='flex gap-3 mt-3'>
          <HurtIcon
            onClick={handleLikePost}
            fill={isLiked}
          />
          <CommentsIcon
            className='hover:text-gray-400'
            onClick={handleModal}
          />
          <ShareIcon
            className='hover:text-gray-400'
            onClick={() => setShowShareModal(true)}
          />
          <div className='ml-auto'>
            <FavoriteIcon
              className={`${!isSavePost ? " hover:text-gray-400" : ""}`}
              onClick={handleSavePost}
              fill={isSavePost}
            />
          </div>
          <Share
            showModal={showShareModal}
            setShowModal={setShowShareModal}
          />
        </div>

        {!homePage && (
          <>
            <h2 className='text-sm font-semibold mt-5'>
              {`${currentLikeCount} ${
                currentLikeCount === 1 ? "like" : "likes"
              }`}
            </h2>
            <p className='text-xs text-gray-500'>{formattedTime}</p>
          </>
        )}
        {homePage && (
          <>
            {currentLikeCount > 0 && (
              <p className='text-sm mt-2 font-semibold'>
                Liked by{" "}
                <strong className='font-semibold cursor-pointer'>
                  {currentLikeCount}
                </strong>{" "}
                person
              </p>
            )}

            <p className='text-sm font-sans mt-2'>
              <strong className='font-sans text-sm font-semibold'>
                {postData.user.userName}
              </strong>{" "}
              {caption}
              {showMore && (
                <span
                  className='cursor-pointer text-gray-600 font-semibold'
                  onClick={() => setIsExpanded(true)}>
                  ...more
                </span>
              )}
              {isExpanded && (
                <span
                  className='cursor-pointer font-semibold text-gray-600'
                  onClick={() => setIsExpanded(false)}>
                  ...less
                </span>
              )}
            </p>
            {postData.commentsCount > 0 && (
              <p
                className='text-sm cursor-pointer text-gray-500 mt-2'
                onClick={handleModal}>
                View all <strong>{postData.commentsCount}</strong> Comments
              </p>
            )}
          </>
        )}
      </div>

      <form
        className='px-3 relative'
        onSubmit={handleCommentPost}>
        <TextArea
          placeholder='Add a comment...'
          maxLength={2200}
          value={commentValue}
          onChange={(newValue) => setCommentValue(newValue)}
          textareaStyle={textareaStyle}
          IconStyle={IconStyle}
          pickerStyle={pickerStyle}
          IconParentStyle={IconParentStyle}
          textareaContainer={textareaContainer}
          className='xs:w-full w-[200px]'
        />
        {commentValue.trim() !== "" && (
          <button
            className={`${btnStyle} font-semibold text-blue-500 absolute bottom-6 right-4`}
            type='submit'>
            Post
          </button>
        )}
      </form>
    </div>
  );
};

export default CommentsForm;
