/** @format */

import { firestore } from "@/lib/firebaseConfig";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { useRef } from "react";

export const updateUserData = async (uid, updatedData) => {
  try {
    const userRef = doc(firestore, "users", uid);
    await updateDoc(userRef, updatedData);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return {
        ...userDoc.data(),
        _id: uid,
      };
    }
    throw new Error("User document not found");
  } catch (err) {
    console.error("Update error:", err);
    throw err;
  }
};

export const updateProfilePic = async (uid, profilePic) => {
  try {
    const userRef = doc(firestore, "users", uid);
    await updateDoc(userRef, { profilePic: profilePic });
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return {
        ...userDoc.data(),
        _id: uid,
      };
    }
    throw new Error("User document not found");
  } catch (err) {
    console.log(err);
  }
};

export const saveUserPost = async (postId, userId) => {
  console.log(postId, userId);
  try {
    const userRef = doc(firestore, "users", userId);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      throw new Error("User document not found");
    }
    const userData = userDoc.data();
    const isSave = userData?.favorites?.includes(postId);
    if (isSave) {
      await updateDoc(userRef, {
        favorites: arrayRemove(postId),
      });
    } else {
      await updateDoc(userRef, {
        favorites: arrayUnion(postId),
      });
    }
  } catch (err) {
    console.error("Error saving post:", err);
    throw err;
  }
};

export const followUser = async (userId, otherUserId) => {
  try {
    const userRef = doc(firestore, "users", userId);
    const otherUserRef = doc(firestore, "users", otherUserId);

    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      throw new Error("User document not found");
    }

    const userData = userDoc.data();
    const isFollow = userData?.following?.includes(otherUserId);

    if (isFollow) {
      await updateDoc(userRef, {
        following: arrayRemove(otherUserId),
        followingCount: increment(-1),
      });
      await updateDoc(otherUserRef, {
        followers: arrayRemove(userId),
        followersCount: increment(-1),
      });
    } else {
      await updateDoc(userRef, {
        following: arrayUnion(otherUserId),
        followingCount: increment(1),
      });
      await updateDoc(otherUserRef, {
        followers: arrayUnion(userId),
        followersCount: increment(1),
      });
    }
  } catch (err) {
    console.log("Error updating follow status:", err);
  }
};
