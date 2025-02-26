/** @format */

import { firestore } from "@/lib/firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";

export const deleteUserNote = async (userId) => {
  try {
    await deleteDoc(doc(firestore, "note", userId));
    console.log(`Note with userId ${userId} deleted successfully.`);
    return true;
  } catch (err) {
    console.error("Error deleting note:", err);
    return false;
  }
};
