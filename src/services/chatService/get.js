/** @format */

import { firestore } from "@/lib/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export const fetchConversations = (userId, setConversations) => {
  const q = query(
    collection(firestore, "messages"),
    where("participants", "array-contains", userId),
    orderBy("lastUpdated", "desc")
  );

  const unsubscribe = onSnapshot(q, async (snapshot) => {
    const threads = await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const data = docSnap.data();
        const otherUserId = data.participants.find((id) => id !== userId);
        const userDoc = await getDoc(doc(firestore, "users", otherUserId));
        return {
          _id: docSnap.id,
          ...data,
          otherUser: userDoc.exists()
            ? { ...userDoc.data(), _id: otherUserId }
            : null,
        };
      })
    );
    setConversations(threads.filter((t) => t.otherUser));
  });

  return unsubscribe;
};

export const fetchMessages = (threadId, setMessages) => {
  const messagesRef = collection(firestore, "messages", threadId, "messages");
  const q = query(messagesRef, orderBy("timestamp", "asc"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const messagesData = snapshot.docs.map((doc) => ({
      _id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate(),
    }));
    setMessages(messagesData);
  });

  return unsubscribe;
};
