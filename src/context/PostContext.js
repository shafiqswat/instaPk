/** @format */

import {
  addPost,
  deletePosts,
  getAllPosts,
  getFollowingPosts,
  getSinglePostById,
  getUserPosts,
  updateUserPost,
} from "@/services/postServices";
import React, { createContext, useContext, useState } from "react";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [myPostsData, setMyPostsData] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [homePagePosts, setHomePagePosts] = useState([]);
  const [postData, setPostData] = useState(null);

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
      const post = await getSinglePostById(postId);
      return post;
    } catch (err) {
      console.error(err);
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async (searchUserPosts) => {
    setLoading(true);
    try {
      const posts = await Promise.all(
        searchUserPosts?.map((postId) => singlePost(postId))
      );
      const validPosts = posts.filter((post) => post !== null);
      setAllPosts(validPosts);
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
        getAppPosts,
        allFollowingPosts,
        homePagePosts,
        setHomePagePosts,
        postData,
        setPostData,
      }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
