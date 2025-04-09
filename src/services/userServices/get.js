/** @format */

import { firestore } from "@/lib/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const getUserData = async (uid) => {
  try {
    const userDoc = await getDoc(doc(firestore, "users", uid));
    if (userDoc.exists())
      return {
        ...userDoc.data(),
        _id: uid,
      };
    return null;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getAllUsers = async () => {
  try {
    const usersCollection = collection(firestore, "users");
    const snapshot = await getDocs(usersCollection);
    const usersList = snapshot.docs.map((doc) => ({
      ...doc.data(),
      _id: doc.id,
    }));
    return usersList;
  } catch (err) {
    console.error("Error fetching users:", err);
    throw new Error(err.message);
  }
};

export const userByUserName = async (userName) => {
  if (!userName) {
    console.error("Invalid userName:", userName);
    throw new Error("userName is required");
  }

  try {
    const usersCollection = collection(firestore, "users");
    const q = query(usersCollection, where("userName", "==", userName));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const userDoc = snapshot.docs[0];
      return {
        ...userDoc.data(),
        _id: userDoc.id,
      };
    }
    return null;
  } catch (err) {
    console.error("Error fetching user by username:", err);
    throw new Error(err.message);
  }
};
