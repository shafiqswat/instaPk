/** @format */

import { firestore } from "@/lib/firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  increment,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

export const addPost = async (uid, caption, imgUrls, user) => {
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
};
