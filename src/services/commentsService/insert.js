/** @format */

import { firestore } from "@/lib/firebaseConfig";
import {
  Timestamp,
  collection,
  addDoc,
  updateDoc,
  increment,
  doc,
  getDoc,
} from "firebase/firestore";

export const createComments = async (postId, user, comment) => {
  try {
    const commentsRef = collection(firestore, "comments");
    const userRef = doc(firestore, "users", user?._id); // Reference to the user document
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error("User not found");
    }

    const userData = userSnap.data(); // Get all user data from Firestore

    const commentData = {
      postId,
      comment,
      createdAt: Timestamp.now(),
      commentsBy: userRef, // Firestore reference to the user
      user: {
        ...userData, // Include all user data
        _id: user?._id, // Ensure _id is included
      },
    };
    const docRef = await addDoc(commentsRef, commentData);
    const commentWithId = { _id: docRef.id, ...commentData };

    // Update the post's comments count
    const postRef = doc(firestore, "posts", postId);
    await updateDoc(postRef, {
      commentsCount: increment(1),
    });

    return commentWithId;
  } catch (err) {
    console.error("Error creating comment:", err);
    throw err;
  }
};
