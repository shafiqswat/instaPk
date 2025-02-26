/** @format */

import {
  createComments,
  deleteComment,
  getComments,
} from "@/services/commentsService";
import React, { createContext, useContext, useState } from "react";
const commentsContext = createContext();
export const CommentsProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState("");

  const addComment = async (postId, user, comment) => {
    setLoading(true);
    try {
      const data = await createComments(postId, user, comment);
      console.log(data, "commmmmmmmmmmmmments");
      setComments((prev) => [...prev, data]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchComments = async (postId) => {
    setLoading(true);
    try {
      if (postId) {
        const data = await getComments(postId);
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
    console.log(postId, commentsId);
    setLoading(true);
    try {
      await deleteComment(postId, commentsId);
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
