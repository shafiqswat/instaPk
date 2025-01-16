/** @format */

import request from "./request";

export const followApi = {
  unFollow: (userId) => request.post(`/user/unfollow/${userId}`),
  follow: (userId) => request.post(`/user/follow/${userId}`),
  unSavePost: (userId) => request.post(`/unsave/${userId}`),
  savePost: (userId) => request.post(`/save/${userId}`),
  allSavePost: () => request.get(`/saved-posts`),
  deleteNote: () => request.delete(`/note`),
  createNote: (data) => request.post(`/note`, data),
  updateNote: (data) => request.put(`/note`, data),
  getNote: () => request.get(`/note`),
  getStories: () => request.get(`/story`),
  uploadStory: (data) => {
    return request.post(`/story`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
