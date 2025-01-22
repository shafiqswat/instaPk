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
  const [isExpanded, setIsExpanded] = useState(false);

  /*<<<<<<<<<<<---------------------  Check the post is  Like  by the current user or not  ------------------------->>>>>>>>>>>>> */

  useEffect(() => {
    setIsLike(postData?.likes?.includes(user?._id));
  }, [postData?.likes]);

  /*<<<<<<<<<<<---------------------  Check the post is  save  by the current user or not  ------------------------->>>>>>>>>>>>> */

  useEffect(() => {
    setIsSavePost(user?.savedPosts?.includes(postData?._id));
  }, [postData]);

  /*<<<<<<<<<<<---------------------  Function to handle Like and Dislike  ------------------------->>>>>>>>>>>>> */

  const handleLike = () => {
    if (isLike) {
      dislikePost(postData._id, setPostData, user._id, setIsLike);
    } else {
      likePost(postData._id, setPostData, user._id, setIsLike);
    }
  };

  /*<<<<<<<<<<<---------------------  Function To Post Comments  ------------------------->>>>>>>>>>>>> */

  const handleCommentPost = (e) => {
    e.preventDefault();
    commentsOnPost(postData._id, {
      comment: commentValue,
    });
    setCommentValue("");
  };

  /*<<<<<<<<<<<--------------------- Function to handle Save and UnSave Posts  ------------------------->>>>>>>>>>>>> */

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
    <div className='w-full'>
      <div className='py-2'>
        {/*<<<<<<<<<<<---------------------  Icons Container  ------------------------->>>>>>>>>>>>> */}

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

        {/*<<<<<<<<<<<---------------------  Post Details or Bio , likes, comments , caption etc   ------------------------->>>>>>>>>>>>> */}

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
                <p className='text-sm mt-2 font-semibold'>
                  Liked by{" "}
                  <strong className='font-semibold cursor-pointer'>
                    {postData.likeCount}
                  </strong>{" "}
                  person
                </p>

                {/*<<<<<<<<<<<---------------------   Ellipsis  For Caption mean add see more and see less   ------------------------->>>>>>>>>>>>> */}

                <p className='text-sm font-sans font-semibold mt-2'>
                  <strong className='font-sans text-sm font-semibold'>
                    {postData.user.userName}
                  </strong>{" "}
                  {isExpanded ? (
                    <>
                      {postData.caption}
                      <span
                        className='cursor-pointer font-semibold text-gray-600'
                        onClick={() => setIsExpanded(false)}>
                        {""} ...less
                      </span>
                    </>
                  ) : (
                    <>
                      {postData?.caption?.slice(0, 100)}
                      {postData?.caption?.length > 100 && (
                        <>
                          <span
                            className='cursor-pointer text-gray-600 font-semibold'
                            onClick={() => setIsExpanded(true)}>
                            {""} ...more
                          </span>
                        </>
                      )}
                    </>
                  )}
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

      {/*<<<<<<<<<<<---------------------  Form Text area for commenting    ------------------------->>>>>>>>>>>>> */}

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
