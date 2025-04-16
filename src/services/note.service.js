/** @format */

import { firestore } from "@/lib/firebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
export const noteService = {
  async getUserNote(userId) {
    try {
      const userNote = await getDoc(doc(firestore, "note", userId));
      if (userNote.exists()) return userNote.data();
      return null;
    } catch (err) {
      console.log(err);
    }
  },

  async addNote(userId, notedData) {
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
  },

  async update(userId, updatedData) {
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
  },

  async deleteUserNote(userId) {
    try {
      await deleteDoc(doc(firestore, "note", userId));
      console.log(`Note with userId ${userId} deleted successfully.`);
      return true;
    } catch (err) {
      console.error("Error deleting note:", err);
      return false;
    }
  },
};
