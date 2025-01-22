/** @format */

import { followService } from "@/services/followService";
import React, { createContext, useContext, useState } from "react";
const FollowContext = createContext();
export const FollowProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saveData, setSaveData] = useState("");
  const [noteData, setNoteData] = useState("");
  const Follow = async (userId, setIsFollow, isFollow) => {
    setLoading(true);
    try {
      const { data } = await followService.follow(userId);
      console.log("FOLLOW User Successfully ", data);
      if (data.status === "success") {
        setIsFollow(!isFollow);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const UnFollow = async (userId, setIsFollow, isFollow) => {
    setLoading(true);
    try {
      const { data } = await followService.unFollow(userId);
      console.log("UnFollow User Successfully", data);
      if (data.status === "status") {
        setIsFollow(!isFollow);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const SavePost = async (userId) => {
    setLoading(true);
    try {
      const { data } = await followService.savePost(userId);
      if (data.message === "Post saved successfully.") {
        setSaveData((prev) => ({ ...prev, savedPosts: [...prev, userId] }));
      }
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const UnSavePost = async (userId) => {
    setLoading(true);
    try {
      const { data } = await followService.unSavePost(userId);
      setSaveData();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const AllSavePosts = async () => {
    setLoading(true);
    try {
      const { data } = await followService.allSavePost();
      setSaveData(data.data);
      console.log(data, "================");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (noteData) => {
    setLoading(true);
    try {
      const { data } = await followService.createNote(noteData);
      setNoteData(data.note);
      console.log(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getNote = async () => {
    setLoading(true);
    try {
      const { data } = await followService.getNote();
      setNoteData(data.note);
      console.log(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const updateNote = async (noteData) => {
    setLoading(true);
    try {
      const { data } = await followService.updateNote(noteData);
      console.log(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const deleteNote = async () => {
    setLoading(true);
    try {
      const { data } = await followService.deleteNote();
      console.log(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const getStories = async () => {
    setLoading(true);
    try {
      const { data } = await followService.getStories();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const uploadStory = async (credentials) => {
    setLoading(true);
    try {
      const { data } = await followService.uploadStory(credentials);
      console.log(data, "upload story ..........");
    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FollowContext.Provider
      value={{
        Follow,
        loading,
        error,
        UnFollow,
        SavePost,
        UnSavePost,
        AllSavePosts,
        saveData,
        createNote,
        getNote,
        updateNote,
        deleteNote,
        noteData,
        getStories,
        uploadStory,
      }}>
      {children}
    </FollowContext.Provider>
  );
};

export const useFollow = () => useContext(FollowContext);
