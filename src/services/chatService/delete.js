/** @format */

import { firestore } from "@/lib/firebaseConfig";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

export const deleteMessage = async (
  threadId,
  messageId,
  deleteForEveryone = false
) => {
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
};
