/** @format */

// services/notification.service.js
import { firestore } from "@/lib/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const createNotification = async ({
  toUserId,
  fromUserId,
  type,
  postId = null,
  commentId = null,
  message = "",
}) => {
  try {
    await addDoc(collection(firestore, "notifications"), {
      toUserId,
      fromUserId,
      type, // 'like', 'comment', 'message', 'follow', 'post'
      postId,
      commentId,
      message,
      read: false,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error creating notification:", error);
  }
};
