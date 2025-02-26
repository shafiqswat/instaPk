/** @format */

import { firestore } from "@/lib/firebaseConfig";
import { doc, Timestamp, updateDoc } from "firebase/firestore";

export const update = async (userId, updatedData) => {
  try {
    const updatedNote = {
      note: updatedData,
      updatedAt: Timestamp.now(),
    };
    await updateDoc(doc(firestore, "note", userId), updatedNote);
    return { ...updatedNote };
  } catch (err) {
    console.error("Error updating note:", err);
    return false;
  }
};
