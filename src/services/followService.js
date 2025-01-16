/** @format */

import { followApi } from "@/api/follow.api";

export const followService = {
  follow: (userId) => followApi.follow(userId),
  unFollow: (userId) => followApi.unFollow(userId),
  savePost: (userId) => followApi.savePost(userId),
  unSavePost: (userId) => followApi.unSavePost(userId),
  allSavePost: () => followApi.allSavePost(),
  createNote: (data) => followApi.createNote(data),
  getNote: () => followApi.getNote(),
  updateNote: (data) => followApi.updateNote(data),
  deleteNote: () => followApi.deleteNote(),
  getStories: () => followApi.getStories(),
  uploadStory: (data) => followApi.uploadStory(data),
};
