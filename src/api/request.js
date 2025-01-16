/** @format */

import axios from "axios";

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

if (typeof window !== "undefined") {
  const token = localStorage.getItem("token");
  if (token) {
    request.defaults.headers["Authorization"] = `${token}`;
  }
}

export default request;
