/** @format */

import { pageApi } from "@/api/page.api";

export const pageService = {
  homePage: (limit) => pageApi.homePage(limit),
  explorePage: (limit) => pageApi.explorePage(limit),
};
