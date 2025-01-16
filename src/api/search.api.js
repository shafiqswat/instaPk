/** @format */

import request from "./request";

export const searchApi = {
  getUser: (userName) => request.get(`/user/search/${userName}`),
};
