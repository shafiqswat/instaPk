/** @format */

import { firestore } from "@/lib/firebaseConfig";
import { deleteDoc, doc, increment, updateDoc } from "firebase/firestore";

export const deletePosts = async (postId, userId) => {
  try {
    const postRef = doc(firestore, "posts", postId);
    const userRef = doc(firestore, "users", userId);
    await deleteDoc(postRef);
    await updateDoc(userRef, {
      postCount: increment(-1),
    });
  } catch (err) {
    console.log(err);
  }
};
