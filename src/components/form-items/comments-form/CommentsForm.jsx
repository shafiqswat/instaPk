/** @format */
"use client";

import React, { useEffect, useState } from "react";
import Share from "@/components/modals/share/Share";
import TextArea from "../textarea/TextArea";
import useCompactTimeFormat from "@/components/hooks/useCompactTimeFormat";
import {
  CommentsIcon,
  FavoriteIcon,
  HurtIcon,
  ShareIcon,
} from "@/constants/SvgIcon";
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
  const { user, savePost } = useAuth();
  const { addComment } = useComments();
  const {
    handleLike,
    handleUnlike,
    isPostLiked,
    getLikeCount,
    fetchLikeStatus,
  } = useLike();

  const [postData, setPostData] = useState(items);
  const [comment, setComment] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [saved, setSaved] = useState(user?.favorites?.includes(items?._id));

  const formattedTime = useCompactTimeFormat(postData?.createdAt);
  const isLiked = isPostLiked(postData?.id);
  const likeCount = getLikeCount(postData?.id) || postData?.likeCount || 0;
  const caption = expanded ? postData.caption : postData.caption?.slice(0, 100);

  useEffect(() => {
    if (postData?.id && user?._id) {
      fetchLikeStatus(postData.id, user._id);
      setSaved(user.favorites?.includes(postData.id));
    }
  }, [postData, user]);

  const toggleLike = async () => {
    if (!postData?.id || !user?._id) return;
    const updated = isLiked
      ? await handleUnlike(postData.id, user._id)
      : await handleLike(postData.id, user._id);
    setPostData((prev) => ({ ...prev, likeCount: updated?.likeCount }));
  };

  const submitComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    addComment(postData.id, user, comment.trim());
    setComment("");
  };

  const toggleSave = () => {
    if (!postData?.id || !user?._id) return;
    savePost(postData.id, user._id, saved, setSaved);
  };

  return (
    <div className='w-full'>
      <div className={`py-2 ${iconsContainerStyle}`}>
        <div className='flex gap-3 mt-3'>
          <HurtIcon
            onClick={toggleLike}
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
              onClick={toggleSave}
              fill={saved}
              className={!saved ? "hover:text-gray-400" : ""}
            />
          </div>
          <Share
            showModal={showShareModal}
            setShowModal={setShowShareModal}
          />
        </div>

        {!homePage ? (
          <>
            <h2 className='text-sm font-semibold mt-5'>
              {likeCount} {likeCount === 1 ? "like" : "likes"}
            </h2>
            <p className='text-xs text-gray-500'>{formattedTime}</p>
          </>
        ) : (
          <>
            {likeCount > 0 && (
              <p className='text-sm mt-2 font-semibold'>
                Liked by <strong>{likeCount}</strong> person
              </p>
            )}
            <p className='text-sm font-sans mt-2'>
              <strong>{postData.user?.userName}</strong> {caption}
              {postData.caption?.length > 100 && (
                <span
                  onClick={() => setExpanded(!expanded)}
                  className='cursor-pointer text-gray-600 font-semibold'>
                  {expanded ? "...less" : "...more"}
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
        onSubmit={submitComment}>
        <TextArea
          placeholder='Add a comment...'
          maxLength={2200}
          value={comment}
          onChange={setComment}
          textareaStyle={textareaStyle}
          IconStyle={IconStyle}
          pickerStyle={pickerStyle}
          IconParentStyle={IconParentStyle}
          textareaContainer={textareaContainer}
          className='xs:w-full w-[200px]'
        />
        {comment.trim() && (
          <button
            type='submit'
            className={`${btnStyle} font-semibold text-blue-500 absolute bottom-6 right-4`}>
            Post
          </button>
        )}
      </form>
    </div>
  );
};

export default CommentsForm;
