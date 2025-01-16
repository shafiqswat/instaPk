/** @format */

import request from "./request";

export const authApi = {
  validateToken: () => request.get("/auth/me"),
  signInRequest: (data) => request.post("/auth/login", data),
  signUpRequest: (data) => request.post("/auth/signup", data),
  forgotPassword: (data) => request.post("/auth/forgot-password", data),
  resetPassword: (data) => request.post("/auth/reset-password", data),
  // signOutRequest: () => request.delete("/auth/sign_out"),
  singleUser: (userId) => request.get(`/auth/${userId}`),
  profilePicChange: (data) => {
    return request.post("/profile-settings/profile-pic", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  profileSettings: (data) => request.put("/profile-settings", data),
};
