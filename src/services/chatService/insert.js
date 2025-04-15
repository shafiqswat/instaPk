/** @format */

import { firestore } from "@/lib/firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

export const sendMessage = async (
  senderId,
  receiverId,
  text,
  imageUrl = null
) => {
  if (!senderId || !receiverId || (!text && !imageUrl)) return;

  const threadId = [senderId, receiverId].sort().join("_");
  const threadRef = doc(firestore, "messages", threadId);
  const messagesCol = collection(firestore, "messages", threadId, "messages");

  const lastMessage = imageUrl ? "📷 Photo" : text;

  await setDoc(
    threadRef,
    {
      participants: [senderId, receiverId],
      lastUpdated: serverTimestamp(),
      lastMessage,
    },
    { merge: true }
  );

  await addDoc(messagesCol, {
    text,
    imageUrl,
    sender: senderId,
    timestamp: serverTimestamp(),
    read: false,
  });
};
