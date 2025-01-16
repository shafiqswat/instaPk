/** @format */

import request from "./request";

export const postApi = {
  createPost: (data) => {
    return request.post("/post", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  postCaption: (postId, data) => request.put(`/post/caption/${postId}`, data),
  myPosts: () => request.get(`/post/my-posts/`),
  singlePost: (postId) => request.get(`/post/${postId}`),
  commentOnPost: (postId, data) =>
    request.post(`/post/comment/${postId}`, data),
  allComments: (postId) =>
    request.get(`/post/comments/${postId}?page=1&limit=5`),
  deletePost: (postId) => request.delete(`/post/${postId}`),
  updatePost: (postId, data) => request.put(`/post/${postId}`, data),
  deleteComments: (commentsId) => request.delete(`/post/comment/${commentsId}`),
  likePost: (postId) => request.post(`/post/like/${postId}`),
  dislikePost: (postId) => request.post(`/post/dislike/${postId}`),
};
