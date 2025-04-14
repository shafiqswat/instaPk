/** @format */
/** @format */

import { firestore } from "@/lib/firebaseConfig";
import {
  doc,
  updateDoc,
  Timestamp,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getDoc } from "firebase/firestore";

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
