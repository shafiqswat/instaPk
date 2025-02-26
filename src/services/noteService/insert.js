/** @format */

import { firestore } from "@/lib/firebaseConfig";
import { doc, setDoc, Timestamp } from "firebase/firestore";
export const addNote = async (userId, notedData) => {
  try {
    const noteData = {
      note: notedData,
      createdAt: Timestamp.now(),
      postBy: userId,
      updatedAt: null,
    };

    await setDoc(doc(firestore, "note", userId), noteData);
    return { ...noteData };
  } catch (err) {
    console.log(err);
  }
};
