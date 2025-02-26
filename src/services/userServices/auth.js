/** @format */
import {
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getUserData } from "./get";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { auth, firestore } from "@/lib/firebaseConfig";

export const register = async (email, password, fullName, userName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCredential.user.uid;
    const userData = {
      fullName,
      userName,
      email,
      createdAt: Timestamp.now(),
      profilePic:
        "https://res.cloudinary.com/dulovaduo/image/upload/v1731394549/profile_pics/bgsrd2kzajvtk86gzkbd.jpg",
      bio: "",
      websiteUrl: "",
      gender: "",
      note: "",
      followers: [],
      following: [],
      favorites: [],
      followersCount: 0,
      followingCount: 0,
      postCount: 0,
      isActive: true,
      isBlocked: false,
      isSuspended: false,
      isPublic: true,
    };
    await setDoc(doc(firestore, "users", uid), userData);
    return { ...userData, _id: uid };
  } catch (err) {
    throw new Error(err.message);
  }
};
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCredential.user.uid;
    const userDoc = await getUserData(uid);
    if (!userDoc) throw new Error("User data not found");
    return { ...userDoc, _id: uid };
  } catch (err) {
    throw new Error(err.message);
  }
};

export const signOutUser = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const forgotPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const onAuthStateChangedUser = (callback) => {
  return onAuthStateChanged(auth, callback);
};
