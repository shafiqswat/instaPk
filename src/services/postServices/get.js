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
import { getUserData } from "../userServices";

export const getSinglePostById = async (postId) => {
  try {
    const postRef = doc(firestore, "posts", postId);
    const postSnap = await getDoc(postRef);

    if (!postSnap.exists()) return null;

    const postData = postSnap.data();
    const userSnap = await getDoc(postData.postBy);

    return {
      id: postSnap.id,
      ...postData,
      user: userSnap.exists() ? { ...userSnap.data(), _id: userSnap.id } : null,
    };
  } catch (err) {
    console.error("Error fetching single post:", err);
    return null;
  }
};

export const getUserPosts = async (userId) => {
  try {
    const postsRef = collection(firestore, "posts");
    const userRef = doc(firestore, "users", userId);
    const q = query(postsRef, where("postBy", "==", userRef));
    const querySnapshot = await getDocs(q);

    const posts = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const postData = doc.data();
        const userSnapshot = await getDoc(postData?.postBy);
        return {
          id: doc.id,
          ...postData,
          user: userSnapshot.exists()
            ? { ...userSnapshot.data(), _id: userSnapshot.id }
            : null,
        };
      })
    );

    return posts;
  } catch (err) {
    console.error("Error fetching user posts:", err);
    return [];
  }
};

export const getAllPosts = async () => {
  try {
    const postsCollection = collection(firestore, "posts");
    const snapshot = await getDocs(postsCollection);

    const postsList = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const postData = doc.data();

        if (postData?.postBy?.id) {
          const user = await getUserData(postData?.postBy?.id);

          return {
            id: doc.id,
            ...postData,
            user: user,
          };
        } else {
          return null;
        }
      })
    );

    return postsList;
  } catch (err) {
    console.error("Error fetching posts:", err);
    throw new Error(err.message);
  }
};

export const getFollowingPosts = async (followingUserIds) => {
  try {
    if (!followingUserIds || followingUserIds.length === 0) return [];

    const postsCollection = collection(firestore, "posts");

    // Firestore supports "in" only for up to 10 items
    const followingUserRefs = followingUserIds
      .slice(0, 10)
      .map((id) => doc(firestore, "users", id));
    const q = query(postsCollection, where("postBy", "in", followingUserRefs));
    const snapshot = await getDocs(q);

    const postsList = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const postData = doc.data();
        const userSnapshot = await getDoc(postData?.postBy);
        return {
          id: doc.id,
          ...postData,
          user: userSnapshot.exists()
            ? { ...userSnapshot.data(), _id: userSnapshot.id }
            : null,
        };
      })
    );

    return postsList;
  } catch (err) {
    console.error("Error fetching following posts:", err);
    throw new Error(err.message);
  }
};
