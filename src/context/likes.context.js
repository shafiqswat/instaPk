/** @format */

import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/firebaseErrorUtils";
import { likeService } from "@/services/like.service";
import { createContext, useContext, useState } from "react";

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
        likeService.isPostLikedByUser(postId, userId),
        likeService.getPostLikes(postId),
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
      const { likeCount } = await likeService.LikePost(postId, userId);
      toast({
        title: "Post Liked",
        description: "Post has been Liked successfully.",
        variant: "success",
        duration: 1000,
      });
      updateLikeState(postId, true, likeCount);
    } catch (error) {
      updateLikeState(postId, false, Math.max(0, currentCount));
      const message = getErrorMessage(err.message);
      toast({
        variant: "destructive",
        title: "Post Liked Failed",
        description: message,
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
        duration: 1000,
      });
    }
  };

  const handleUnlike = async (postId, userId) => {
    const currentCount = likes[postId]?.likeCount || 0;
    updateLikeState(postId, false, Math.max(0, currentCount - 1));
    try {
      const { likeCount } = await likeService.UnlikePost(postId, userId);
      toast({
        title: "Post UnLiked",
        description: "Post has been UnLiked successfully.",
        variant: "success",
        duration: 1000,
      });
      updateLikeState(postId, false, likeCount);
    } catch (error) {
      updateLikeState(postId, true, currentCount + 1);
      toast({
        variant: "destructive",
        title: "Post UnLiked Failed",
        description: message,
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
        duration: 1000,
      });
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
