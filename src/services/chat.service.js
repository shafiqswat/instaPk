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
  addDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const chatService = {
  async fetchConversations(userId, setConversations) {
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
  },

  async fetchMessages(threadId, setMessages) {
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
  },

  async sendMessage(senderId, receiverId, text, imageUrl = null) {
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
  },

  async deleteMessage(threadId, messageId, deleteForEveryone = false) {
    if (!threadId || !messageId) return;

    const messageRef = doc(
      firestore,
      "messages",
      threadId,
      "messages",
      messageId
    );

    if (deleteForEveryone) {
      // Delete the message completely
      await deleteDoc(messageRef);
    } else {
      // Mark as deleted for sender only
      await updateDoc(messageRef, {
        deletedForSender: true,
        text: "This message was deleted",
        imageUrl: null,
      });
    }
  },
};
