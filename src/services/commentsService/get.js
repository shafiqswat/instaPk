/** @format */

import { firestore } from "@/lib/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";

export const getComments = async (postId) => {
  try {
    const commentsRef = collection(firestore, "comments");
    const q = query(commentsRef, where("postId", "==", postId));
    const querySnapshot = await getDocs(q);

    const comments = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const commentData = doc.data();
        const userSnapshot = await getDoc(commentData.commentsBy);
        const userData = userSnapshot.data();
        return {
          _id: doc.id,
          ...commentData,
          user: { ...userData, _id: commentData.commentsBy },
        };
      })
    );

    return comments;
  } catch (err) {
    console.error("Error fetching comments:", err);
    return [];
  }
};
