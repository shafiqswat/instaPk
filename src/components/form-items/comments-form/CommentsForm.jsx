/** @format */
"use client";
import Share from "@/components/modals/share/Share";
import {
  CommentsIcon,
  FavoriteIcon,
  HurtIcon,
  ShareIcon,
} from "@/constants/SvgIcon";
import { usePost } from "@/context/PostContext";
import React, { useEffect, useState } from "react";
import TextArea from "../textarea/TextArea";
import { useFollow } from "@/context/FollowContext";
import useCompactTimeFormat from "@/components/hooks/useCompactTimeFormat";

const CommentsForm = ({
  user,
  items,
  homePage,
  handleModal,
  textareaStyle,
  IconStyle,
  pickerStyle,
  IconParentStyle,
  btnStyle,
}) => {
  const [postData, setPostData] = useState(items);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isLike, setIsLike] = useState(postData?.likes?.includes(user?._id));
  const [commentValue, setCommentValue] = useState("");
  const { commentsOnPost, likePost, dislikePost } = usePost();
  const { UnSavePost, SavePost } = useFollow();
  const [isSavePost, setIsSavePost] = useState(
    user?.savedPosts?.includes(postData?._id)
  );

  useEffect(() => {
    setIsLike(postData?.likes?.includes(user?._id));
  }, [postData?.likes]);

  useEffect(() => {
    setIsSavePost(user?.savedPosts?.includes(postData?._id));
  }, [postData]);

  const handleLike = () => {
    if (isLike) {
      dislikePost(postData._id, setPostData, user._id, setIsLike);
    } else {
      likePost(postData._id, setPostData, user._id, setIsLike);
    }
  };

  const handleCommentPost = (e) => {
    e.preventDefault();
    commentsOnPost(postData._id, {
      comment: commentValue,
    });
    setCommentValue("");
  };

  const handleSavePost = () => {
    if (isSavePost) {
      setIsSavePost(false);
      UnSavePost(postData._id);
    } else {
      setIsSavePost(true);
      SavePost(postData._id);
    }
  };
  const formattedTime = useCompactTimeFormat(postData.createdAt);

  return (
    <div>
      <div className='py-2 px-4'>
        <div className='flex gap-3 mt-3 '>
          <HurtIcon
            onClick={handleLike}
            fill={isLike}
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
              {`${postData?.likeCount} ${
                postData?.likes?.length > 1 ? "likes" : "like"
              }`}
            </h2>
            <p className='text-xs text-gray-500'>{formattedTime}</p>
          </>
        )}
        {homePage && (
          <>
            {postData.likeCount > 0 && (
              <>
                <p className='text-sm mt-2'>
                  Liked by{" "}
                  <strong className='font-semibold cursor-pointer'>
                    {postData.likeCount}
                  </strong>{" "}
                  person
                </p>
                <p className='text-sm font-sans mt-2'>
                  <strong className='font-sans text-sm font-semibold'>
                    {postData.user.userName}
                  </strong>{" "}
                  {postData.caption}
                </p>
              </>
            )}
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
