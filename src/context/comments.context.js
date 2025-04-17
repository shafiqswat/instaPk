/** @format */

import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/firebaseErrorUtils";
import { commentsService } from "@/services/comments.service";
import React, { createContext, useContext, useState } from "react";
const commentsContext = createContext();
export const CommentsProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState("");

  const addComment = async (postId, user, comment) => {
    setLoading(true);
    try {
      const data = await commentsService.createComments(postId, user, comment);
      toast({
        title: "Comments Added",
        description: "Your Comments has been added Successfully.",
        variant: "success",
        duration: 1000,
      });
      setComments((prev) => [...prev, data]);
    } catch (err) {
      const message = getErrorMessage(err.message);
      toast({
        variant: "destructive",
        title: "Comments Add Failed",
        description: message,
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
        duration: 1000,
      });
    } finally {
      setLoading(false);
    }
  };
  const fetchComments = async (postId) => {
    setLoading(true);
    try {
      if (postId) {
        const data = await commentsService.getComments(postId);
        setComments(data);
      }
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const deleteComments = async (postId, commentsId) => {
    toast({
      title: "Comments Deleted",
      description: "Your Comments has been deleted Successfully.",
      variant: "success",
      duration: 1000,
    });
    setLoading(true);
    try {
      await commentsService.deleteComment(postId, commentsId);
      const message = getErrorMessage(err.message);
      toast({
        variant: "destructive",
        title: "Comments Delete Failed",
        description: message,
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
        duration: 1000,
      });
      setComments((prevData) =>
        prevData.filter((comment) => comment._id !== commentsId)
      );
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <commentsContext.Provider
      value={{
        loading,
        error,
        comments,
        addComment,
        fetchComments,
        deleteComments,
      }}>
      {children}
    </commentsContext.Provider>
  );
};

export const useComments = () => useContext(commentsContext);
