/** @format */

import { firestore } from "@/lib/firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

export const sendMessage = async (senderId, receiverId, text) => {
  if (!senderId || !receiverId || !text) return;

  const threadId = [senderId, receiverId].sort().join("_");
  const threadRef = doc(firestore, "messages", threadId);
  const messagesCol = collection(firestore, "messages", threadId, "messages");

  await setDoc(
    threadRef,
    {
      participants: [senderId, receiverId],
      lastUpdated: serverTimestamp(),
      lastMessage: text,
    },
    { merge: true }
  );

  await addDoc(messagesCol, {
    text,
    sender: senderId,
    timestamp: serverTimestamp(),
    read: false,
  });
};
