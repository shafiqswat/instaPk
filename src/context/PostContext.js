/** @format */

import {
  addPost,
  deletePosts,
  getAllPosts,
  getFollowingPosts,
  getUserPosts,
  likeUserPost,
  updateUserPost,
} from "@/services/postServices";
import React, { createContext, useContext, useState } from "react";
const PostContext = createContext();
export const PostProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [myPostsData, setMyPostsData] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const createPost = async ({ uid, caption, imgUrls, user }) => {
    setLoading(true);
    try {
      const data = await addPost(uid, caption, imgUrls, user);
      setMyPostsData((prev) => [data, ...prev]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const myPosts = async (userId) => {
    setLoading(true);
    try {
      const userPosts = await getUserPosts(userId);
      setMyPostsData(userPosts);
    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const updatedPost = async (postId, credentials) => {
    setLoading(true);
    try {
      const data = await updateUserPost(postId, credentials);
      setMyPostsData((prevData) =>
        prevData.map((post) =>
          post.id === postId ? { ...post, ...data } : post
        )
      );
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId, userId) => {
    setLoading(true);
    try {
      await deletePosts(postId, userId);
      setMyPostsData((prevData) =>
        prevData.filter((post) => post.id !== postId)
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const singlePost = async (postId) => {
    setLoading(true);
    try {
      const { data } = await getUserPosts(postId);
      // if (data.message === "Post fetched successfully") {
      return data;
      // }
    } catch (err) {
      console.error(err);
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async (searchUserPosts) => {
    // console.log("fav", searchUserPosts);
    setLoading(true);
    try {
      const posts = await Promise.all(
        searchUserPosts?.map((postId) => singlePost(postId))
      );
      // const validPosts = posts.filter((post) => post !== null);
      setAllPosts(posts);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const getAppPosts = async () => {
    setLoading(true);
    try {
      const posts = await getAllPosts();
      return posts;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const allFollowingPosts = async (followingUserIds) => {
    setLoading(true);
    try {
      const posts = getFollowingPosts(followingUserIds);
      return posts;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const likePost = async (postId, userId, setPostData, isLike, setIsLike) => {
    setIsLike(!isLike);
    try {
      await likeUserPost(postId, userId);
      if (!isLike) {
        setPostData((prev) => ({
          ...prev,
          likeCount: prev.likeCount + 1,
          likes: [...prev.likes, userId],
        }));
      } else {
        setPostData((prev) => ({
          ...prev,
          likeCount: prev.likeCount - 1,
          likes: prev.likes.filter((id) => id !== userId),
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PostContext.Provider
      value={{
        loading,
        error,
        createPost,
        myPosts,
        singlePost,
        myPostsData,
        fetchPosts,
        allPosts,
        deletePost,
        updatedPost,
        likePost,
        getAppPosts,
        allFollowingPosts,
      }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
