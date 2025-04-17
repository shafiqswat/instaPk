/** @format */

import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/firebaseErrorUtils";
import { postService } from "@/services/post.service";
import React, { createContext, useContext, useState } from "react";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [myPostsData, setMyPostsData] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [homePagePosts, setHomePagePosts] = useState([]);
  const [postData, setPostData] = useState(null);

  const addPost = async ({ uid, caption, imgUrls, user }) => {
    setLoading(true);
    try {
      const data = await postService.addPost(uid, caption, imgUrls, user);
      toast({
        title: "Post Created",
        description: "Your post has been created successfully.",
        variant: "success",
        duration: 2000,
      });
      setMyPostsData((prev) => [data, ...prev]);
    } catch (err) {
      const message = getErrorMessage(err.message);
      toast({
        variant: "destructive",
        title: "Post Created Failed",
        description: message,
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const myPosts = async (userId) => {
    setLoading(true);
    try {
      const userPosts = await postService.getUserPosts(userId);
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
      const data = await postService.updateUserPost(postId, credentials);
      toast({
        title: "Post Updated",
        description: "Your post has been updated successfully.",
        variant: "success",
        duration: 2000,
      });
      setMyPostsData((prevData) =>
        prevData.map((post) =>
          post.id === postId ? { ...post, ...data } : post
        )
      );
    } catch (err) {
      const message = getErrorMessage(err.message);
      toast({
        variant: "destructive",
        title: "Post Updated Failed",
        description: message,
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId, userId) => {
    setLoading(true);
    try {
      await postService.deletePosts(postId, userId);
      toast({
        title: "Post Deleted",
        description: "Your post has been deleted successfully.",
        variant: "success",
        duration: 2000,
      });
      setMyPostsData((prevData) =>
        prevData.filter((post) => post.id !== postId)
      );
    } catch (err) {
      const message = getErrorMessage(err.message);
      toast({
        variant: "destructive",
        title: "Post Delete Failed",
        description: message,
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const singlePost = async (postId) => {
    setLoading(true);
    try {
      const post = await postService.getSinglePostById(postId);
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
      const posts = await postService.getAllPosts();
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
      const posts = postService.getFollowingPosts(followingUserIds);
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
        addPost,
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
