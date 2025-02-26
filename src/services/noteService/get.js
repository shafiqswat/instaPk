/** @format */

import { firestore } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

/** @format */
export const getUserNote = async (userId) => {
  try {
    const userNote = await getDoc(doc(firestore, "note", userId));
    if (userNote.exists()) return userNote.data();
    return null;
  } catch (err) {
    console.log(err);
  }
};
