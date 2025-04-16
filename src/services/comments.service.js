/** @format */

import { firestore } from "@/lib/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  getDoc,
  Timestamp,
  addDoc,
  updateDoc,
  increment,
  doc,
  deleteDoc,
} from "firebase/firestore";

export const commentsService = {
  async getComments(postId) {
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
  },

  async createComments(postId, user, comment) {
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
        updatedAt: Timestamp.now(),
      });

      return commentWithId;
    } catch (err) {
      console.error("Error creating comment:", err);
      throw err;
    }
  },

  async deleteComment(postId, commentsId) {
    try {
      const commentRef = doc(firestore, "comments", commentsId);
      await deleteDoc(commentRef);
      const postRef = doc(firestore, "posts", postId);
      await updateDoc(postRef, {
        commentsCount: increment(-1),
        updatedAt: Timestamp.now(),
      });

      console.log("Comment deleted successfully");
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  },
};
