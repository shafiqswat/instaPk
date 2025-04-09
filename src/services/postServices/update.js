/** @format */
/** @format */

import { firestore } from "@/lib/firebaseConfig";

import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
  getDoc,
  Timestamp,
} from "firebase/firestore";

// Update post details
export const updateUserPost = async (postId, updatedData) => {
  try {
    const postRef = doc(firestore, "posts", postId);
    const updateData = {
      ...updatedData,
      updatedAt: Timestamp.now(),
    };
    await updateDoc(postRef, updateData);
    return { id: postId, ...updateData };
  } catch (err) {
    console.log("Error updating post:", err);
    throw err;
  }
};

export const likeUserPost = async (postId, userId) => {
  try {
    const postRef = doc(firestore, "posts", postId);
    const postSnap = await getDoc(postRef);
    if (!postSnap.exists()) {
      throw new Error("Post does not exist");
    }
    const postData = postSnap.data();
    const isLiked = postData.likes?.includes(userId);
    if (isLiked) {
      await updateDoc(postRef, {
        likes: arrayRemove(userId),
        likeCount: increment(-1),
      });
    } else {
      await updateDoc(postRef, {
        likes: arrayUnion(userId),
        likeCount: increment(1),
      });
    }
  } catch (err) {
    console.log("Error liking/unliking post:", err);
    throw err;
  }
};
