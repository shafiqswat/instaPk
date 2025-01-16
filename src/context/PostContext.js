/** @format */

import { postService } from "@/services/postService";
import React, { createContext, useContext, useState } from "react";
const PostContext = createContext();
export const PostProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [myPostsData, setMyPostsData] = useState([]);
  const [singlePostData, setSinglePostData] = useState({});
  const [comments, setComments] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const handlePostWithCaption = async ({ credentials, caption }) => {
    setLoading(true);
    try {
      const { data: createData } = await postService.createPost(credentials);
      const postId = createData?.post._id;
      if (createData.message === "Post created successfully") {
        const newPost = { ...createData.post };
        if (caption) {
          const { data: captionData } = await postService.postCaption(postId, {
            caption,
          });
          if (captionData.message === "Caption updated successfully") {
            newPost.caption = captionData.post.caption;
          }
        }
        setMyPostsData((prevPosts) => [newPost, ...prevPosts]);
      }
      return postId;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const myPosts = async () => {
    setLoading(true);
    try {
      const { data } = await postService.myPosts();
      setMyPostsData(data.data);
    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const singlePost = async (postId) => {
    setLoading(true);
    try {
      const { data } = await postService.singlePost(postId);
      if (data.message === "Post fetched successfully") {
        return data.post;
      }
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

  const commentsOnPost = async (postId, credentials) => {
    setLoading(true);
    try {
      const { data } = await postService.commentOnPost(postId, credentials);
      if (data.status === "success") {
        allComments(postId);
      }
    } catch {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const allComments = async (postId) => {
    setLoading(true);
    try {
      const { data } = await postService.allComments(postId);
      setComments([data.data]);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId) => {
    setLoading(false);
    try {
      const { data } = await postService.deletePost(postId);
      console.log(data);
      if (data.status === "success") {
        myPosts();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const updatedPost = async (postId, credentials) => {
    setLoading(true);
    try {
      const { data } = await postService.updatePost(credentials, postId);
      console.log(data);
      if (data.status === "success") {
        myPostsData((prevData) => [data.data, ...prevData]);
        console.log(
          "====================data",
          myPostsData((prevData) => [...prevData])
        );
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteComments = async (commentsId) => {
    setLoading(true);
    try {
      const { data } = await postService.deleteComments(commentsId);
      console.log(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const likePost = async (postId, postData, userId, setIsLike) => {
    setLoading(true);
    setIsLike(true);
    try {
      const { data } = await postService.likePost(postId);
      console.log(data);
      if (data.message == "Post liked successfully.") {
        postData((prev) => ({
          ...prev,
          likeCount: prev.likeCount + 1,
          likes: [...prev.likes, userId],
        }));
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  // console.log(singlePostData);

  const dislikePost = async (postId, postData, userId, setIsLike) => {
    setLoading(true);
    setIsLike(false);
    try {
      const { data } = await postService.dislikePost(postId);
      console.log(data);
      postData((prev) => ({
        ...prev,
        likeCount: prev.likeCount - 1,
        likes: prev.likes.filter((id) => id !== userId),
      }));
      console.log(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PostContext.Provider
      value={{
        loading,
        error,
        handlePostWithCaption,
        myPosts,
        singlePost,
        myPostsData,
        fetchPosts,
        allPosts,
        commentsOnPost,
        allComments,
        comments,
        deletePost,
        updatedPost,
        deleteComments,
        likePost,
        dislikePost,
      }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
