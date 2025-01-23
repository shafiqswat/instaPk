/** @format */

import { useState } from "react";

// Move the initializeFollowStatus function outside of the hook
const initializeFollowStatus = (user) => {
  if (user && user.following) {
    return user?.following.reduce((acc, userId) => {
      acc[userId] = true;
      return acc;
    }, {});
  }
  return {};
};

export const useFollowStatus = (user) => {
  const [isFollow, setIsFollow] = useState(() => initializeFollowStatus(user));

  const toggleFollow = (id, Follow, UnFollow) => {
    setIsFollow((prev) => {
      const updatedStatus = { ...prev, [id]: !prev[id] };
      if (updatedStatus[id]) {
        Follow(id);
      } else {
        UnFollow(id);
      }
      return updatedStatus;
    });
  };

  return { isFollow, toggleFollow };
};
