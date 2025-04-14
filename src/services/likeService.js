/** @format */

import { firestore } from "@/lib/firebaseConfig";
import {
  collection,
  doc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  deleteDoc,
  increment,
} from "firebase/firestore";

const likesCollection = collection(firestore, "likes");
const postsCollection = collection(firestore, "posts");

export const isPostLikedByUser = async (postId, userId) => {
  try {
    const likesQuery = query(
      likesCollection,
      where("postId", "==", postId),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(likesQuery);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking if post is liked:", error);
    return false;
  }
};

export const LikePost = async (postId, userId) => {
  try {
    const isLiked = await isPostLikedByUser(postId, userId);
    if (isLiked) {
      throw new Error("Post is already liked");
    }

    await addDoc(likesCollection, {
      postId,
      userId,
      createdAt: new Date(),
    });

    const postRef = doc(postsCollection, postId);
    await updateDoc(postRef, {
      likeCount: increment(1),
    });

    const postDoc = await getDoc(postRef);
    const postData = postDoc.data();

    return {
      likeCount: postData.likeCount || 0,
    };
  } catch (error) {
    console.error("Error liking post:", error);
    throw error;
  }
};

export const UnlikePost = async (postId, userId) => {
  try {
    // Find and delete like document
    const likesQuery = query(
      likesCollection,
      where("postId", "==", postId),
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(likesQuery);
    if (querySnapshot.empty) {
      throw new Error("Post is not liked");
    }

    // Delete all matching like documents (should be only one)
    const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    // Update post like count
    const postRef = doc(postsCollection, postId);
    await updateDoc(postRef, {
      likeCount: increment(-1), // Using increment with negative value instead of decrement
    });

    // Get updated like count
    const postDoc = await getDoc(postRef);
    const postData = postDoc.data();

    return {
      likeCount: Math.max(0, postData.likeCount || 0),
    };
  } catch (error) {
    console.error("Error unliking post:", error);
    throw error;
  }
};

export const getPostLikes = async (postId) => {
  try {
    const postRef = doc(postsCollection, postId);
    const postDoc = await getDoc(postRef);

    const postData = postDoc.data();
    return {
      likeCount: postData.likeCount || 0,
    };
  } catch (error) {
    console.error("Error getting post likes:", error);
    return { likeCount: 0 };
  }
};
