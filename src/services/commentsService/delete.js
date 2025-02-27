/** @format */

import { firestore } from "@/lib/firebaseConfig";
import { doc, deleteDoc, updateDoc, increment } from "firebase/firestore";

export const deleteComment = async (postId, commentsId) => {
  try {
    const commentRef = doc(firestore, "comments", commentsId);
    await deleteDoc(commentRef);
    const postRef = doc(firestore, "posts", postId);
    await updateDoc(postRef, {
      commentsCount: increment(-1),
    });

    console.log("Comment deleted successfully");
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
};
