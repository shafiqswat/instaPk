/** @format */

import { firestore } from "@/lib/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  addDoc,
  increment,
  Timestamp,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { userServices } from "./user.service";

export const postService = {
  async getSinglePostById(postId) {
    try {
      const postRef = doc(firestore, "posts", postId);
      const postSnap = await getDoc(postRef);

      if (!postSnap.exists()) return null;

      const postData = postSnap.data();
      const userSnap = await getDoc(postData.postBy);

      return {
        id: postSnap.id,
        ...postData,
        user: userSnap.exists()
          ? { ...userSnap.data(), _id: userSnap.id }
          : null,
      };
    } catch (err) {
      console.error("Error fetching single post:", err);
      return null;
    }
  },

  async getUserPosts(userId) {
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
  },

  async getAllPosts() {
    try {
      const postsCollection = collection(firestore, "posts");
      const snapshot = await getDocs(postsCollection);

      const postsList = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const postData = doc.data();

          if (postData?.postBy?.id) {
            const user = await userServices.getUserData(postData?.postBy?.id);

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
  },

  async getFollowingPosts(followingUserIds) {
    try {
      if (!followingUserIds || followingUserIds.length === 0) return [];

      const postsCollection = collection(firestore, "posts");

      // Firestore supports "in" only for up to 10 items
      const followingUserRefs = followingUserIds
        .slice(0, 10)
        .map((id) => doc(firestore, "users", id));
      const q = query(
        postsCollection,
        where("postBy", "in", followingUserRefs)
      );
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
  },

  async addPost(uid, caption, imgUrls, user) {
    console.log(imgUrls, ";;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
    const userRef = doc(firestore, "users", uid);
    try {
      const postData = {
        caption,
        commentsCount: 0,
        createdAt: Timestamp.now(),
        imageUrls: imgUrls,
        isPublic: true,
        likeCount: 0,
        postBy: userRef,
        updatedAt: "",
        save: [],
      };
      const postRef = await addDoc(collection(firestore, "posts"), postData);
      if (postRef.id) {
        await updateDoc(userRef, {
          postCount: increment(1),
        });
      }
      return { ...postData, _id: postRef.id, user: user };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  // Update post details
  async updateUserPost(postId, updatedData) {
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
  },

  async deletePosts(postId, userId) {
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
  },
};
