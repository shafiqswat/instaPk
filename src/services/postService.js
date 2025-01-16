/** @format */

import { postApi } from "@/api/post.api";

export const postService = {
  createPost: (data) => postApi.createPost(data),
  postCaption: (postId, data) => postApi.postCaption(postId, data),
  myPosts: () => postApi.myPosts(),
  singlePost: (postId) => postApi.singlePost(postId),
  commentOnPost: (postId, data) => postApi.commentOnPost(postId, data),
  allComments: (postId) => postApi.allComments(postId),
  deletePost: (postId) => postApi.deletePost(postId),
  updatePost: (postId, data) => postApi.updatePost(postId, data),
  deleteComments: (commentsId) => postApi.deleteComments(commentsId),
  likePost: (postId) => postApi.likePost(postId),
  dislikePost: (postId) => postApi.dislikePost(postId),
};
