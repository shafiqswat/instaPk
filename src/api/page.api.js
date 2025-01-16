/** @format */

import request from "./request";

export const pageApi = {
  homePage: (limit) => request.get(`/home?limit=${limit}`),
  explorePage: (limit) => request.get(`/explore?limit=${limit}`),
};
