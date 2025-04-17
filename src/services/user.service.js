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
import {
  doc,
  setDoc,
  Timestamp,
  collection,
  getDoc,
  getDocs,
  query,
  where,
  arrayRemove,
  arrayUnion,
  increment,
  updateDoc,
} from "firebase/firestore";
import { auth, firestore } from "@/lib/firebaseConfig";

export const userServices = {
  async register(email, password, fullName, userName) {
    try {
      // 🔍 Step 1: Check if username is already taken
      const usernameQuery = await getDocs(
        query(collection(firestore, "users"), where("userName", "==", userName))
      );
      if (!usernameQuery.empty) {
        throw new Error("Username is already taken.");
      }
      // ✅ Step 2: Continue with signup
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
  },
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;
      const userDoc = await userServices.getUserData(uid);
      if (!userDoc) throw new Error("User data not found");
      return { ...userDoc, _id: uid };
    } catch (err) {
      throw new Error(err.message);
    }
  },

  async signOutUser() {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async forgotPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      throw new Error(err.message);
    }
  },

  async onAuthStateChangedUser(callback) {
    return onAuthStateChanged(auth, callback);
  },

  async getUserData(uid) {
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
  },

  async getAllUsers() {
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
  },

  async userByUserName(userName) {
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
  },

  async updateUserData(uid, updatedData) {
    try {
      const userRef = doc(firestore, "users", uid);
      await updateDoc(userRef, updatedData);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        return {
          ...userDoc.data(),
          _id: uid,
        };
      }
      throw new Error("User document not found");
    } catch (err) {
      console.error("Update error:", err);
      throw err;
    }
  },

  async updateProfilePic(uid, profilePic) {
    try {
      const userRef = doc(firestore, "users", uid);
      await updateDoc(userRef, { profilePic: profilePic });
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        return {
          ...userDoc.data(),
          _id: uid,
        };
      }
      throw new Error("User document not found");
    } catch (err) {
      console.log(err);
    }
  },

  async saveUserPost(postId, userId) {
    console.log(postId, userId);
    try {
      const userRef = doc(firestore, "users", userId);
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        throw new Error("User document not found");
      }
      const userData = userDoc.data();
      const isSave = userData?.favorites?.includes(postId);
      if (isSave) {
        await updateDoc(userRef, {
          favorites: arrayRemove(postId),
        });
      } else {
        await updateDoc(userRef, {
          favorites: arrayUnion(postId),
        });
      }
    } catch (err) {
      console.error("Error saving post:", err);
      throw err;
    }
  },

  async followUser(userId, otherUserId) {
    try {
      const userRef = doc(firestore, "users", userId);
      const otherUserRef = doc(firestore, "users", otherUserId);

      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        throw new Error("User document not found");
      }

      const userData = userDoc.data();
      const isFollow = userData?.following?.includes(otherUserId);

      if (isFollow) {
        await updateDoc(userRef, {
          following: arrayRemove(otherUserId),
          followingCount: increment(-1),
        });
        await updateDoc(otherUserRef, {
          followers: arrayRemove(userId),
          followersCount: increment(-1),
        });
      } else {
        await updateDoc(userRef, {
          following: arrayUnion(otherUserId),
          followingCount: increment(1),
        });
        await updateDoc(otherUserRef, {
          followers: arrayUnion(userId),
          followersCount: increment(1),
        });
      }
    } catch (err) {
      console.log("Error updating follow status:", err);
    }
  },
};
