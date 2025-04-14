/** @format */

import { createContext, useContext, useState } from "react";
import {
  isPostLikedByUser,
  LikePost,
  UnlikePost,
  getPostLikes,
} from "@/services/likeService";

const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
  const [likes, setLikes] = useState({
    // post1: { isLiked: true, likeCount: 5 },
  });

  const updateLikeState = (postId, isLiked, likeCount) => {
    setLikes((prev) => ({
      ...prev,
      [postId]: { isLiked, likeCount },
    }));
  };

  const fetchLikeStatus = async (postId, userId) => {
    if (!postId || !userId) return;
    try {
      const [isLiked, { likeCount }] = await Promise.all([
        isPostLikedByUser(postId, userId),
        getPostLikes(postId),
      ]);
      updateLikeState(postId, isLiked, likeCount);
    } catch (error) {
      console.error("Error fetching like status:", error);
    }
  };

  const handleLike = async (postId, userId) => {
    const currentCount = likes[postId]?.likeCount || 0;
    updateLikeState(postId, true, currentCount + 1);
    try {
      const { likeCount } = await LikePost(postId, userId);
      updateLikeState(postId, true, likeCount);
    } catch (error) {
      updateLikeState(postId, false, Math.max(0, currentCount));
      console.error("Error liking post:", error);
      throw error;
    }
  };

  const handleUnlike = async (postId, userId) => {
    const currentCount = likes[postId]?.likeCount || 0;
    updateLikeState(postId, false, Math.max(0, currentCount - 1));
    try {
      const { likeCount } = await UnlikePost(postId, userId);
      updateLikeState(postId, false, likeCount);
    } catch (error) {
      updateLikeState(postId, true, currentCount + 1);
      console.error("Error unliking post:", error);
      throw error;
    }
  };

  return (
    <LikeContext.Provider
      value={{
        isPostLiked: (postId) => likes[postId]?.isLiked || false,
        getLikeCount: (postId) => likes[postId]?.likeCount || 0,
        fetchLikeStatus,
        handleLike,
        handleUnlike,
      }}>
      {children}
    </LikeContext.Provider>
  );
};

export const useLike = () => useContext(LikeContext);
