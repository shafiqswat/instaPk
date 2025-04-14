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
  const [likes, setLikes] = useState({});

  const fetchLikeStatus = async (postId, userId) => {
    if (!postId || !userId) return;

    try {
      const [isLiked, { likeCount }] = await Promise.all([
        isPostLikedByUser(postId, userId),
        getPostLikes(postId),
      ]);

      setLikes((prev) => ({ ...prev, [postId]: { isLiked, likeCount } }));
    } catch (error) {
      console.error("Error fetching like status:", error);
    }
  };

  const handleLike = async (postId, userId) => {
    // Optimistic update
    setLikes((prev) => ({
      ...prev,
      [postId]: {
        isLiked: true,
        likeCount: (prev[postId]?.likeCount || 0) + 1,
      },
    }));

    try {
      const updatedData = await LikePost(postId, userId);
      // Update with actual data
      setLikes((prev) => ({
        ...prev,
        [postId]: { isLiked: true, likeCount: updatedData.likeCount },
      }));
      return updatedData;
    } catch (error) {
      // Revert on error
      setLikes((prev) => ({
        ...prev,
        [postId]: {
          isLiked: false,
          likeCount: (prev[postId]?.likeCount || 0) - 1,
        },
      }));
      console.error("Error liking post:", error);
      throw error;
    }
  };

  const handleUnlike = async (postId, userId) => {
    // Optimistic update
    setLikes((prev) => ({
      ...prev,
      [postId]: {
        isLiked: false,
        likeCount: Math.max(0, (prev[postId]?.likeCount || 0) - 1),
      },
    }));

    try {
      const updatedData = await UnlikePost(postId, userId);
      // Update with actual data
      setLikes((prev) => ({
        ...prev,
        [postId]: { isLiked: false, likeCount: updatedData.likeCount },
      }));
      return updatedData;
    } catch (error) {
      // Revert on error
      setLikes((prev) => ({
        ...prev,
        [postId]: {
          isLiked: true,
          likeCount: (prev[postId]?.likeCount || 0) + 1,
        },
      }));
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
