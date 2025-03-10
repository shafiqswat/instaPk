/** @format */
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  followUser,
  forgotPassword,
  getAllUsers,
  getUserData,
  login,
  onAuthStateChangedUser,
  register,
  saveUserPost,
  signOutUser,
  updateUserData,
  userByUserName,
} from "@/services/userServices";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [singleUserData, setSingleUserData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allFollowing, setAllFollowing] = useState([]);
  const [error, setError] = useState(null);
  const [isFollow, setIsFollow] = useState({});
  const [searchUser, setSearchUser] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (allUsers.length === 0) {
      GetAllUsers();
    }
  }, []);

  useEffect(() => {
    if (user && allUsers.length > 0) {
      const followState = {};
      allUsers.forEach((u) => {
        followState[u._id] = user.following?.includes(u._id) || false;
      });
      setIsFollow(followState);
    }
  }, [user, allUsers]);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedUser(async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getUserData(currentUser.uid);
          setUser({ ...userDoc, _id: currentUser.uid });
          setIsAuthenticated(true);
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sign-in method
  const signIn = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await login(email, password);
      setUser(userData);
      setIsAuthenticated(true);
      router.push("/");
    } catch (err) {
      setError(err.message);
      console.error("Sign-in failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Sign-up method
  const signUpFun = async ({ email, password, fullName, userName }) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await register(email, password, fullName, userName);
      setUser(userData);
      setIsAuthenticated(true);
      router.push("/edit");
    } catch (err) {
      setError(err.message);
      console.error("Sign-up failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Forgot password method
  const ForgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    try {
      await forgotPassword(email);
      router.push("/reset-password");
    } catch (err) {
      setError(err.message);
      console.error("Error sending reset password email:", err);
    } finally {
      setLoading(false);
    }
  };

  // Reset Password
  // const ResetPassword = async (credentials) => {
  //   setLoading(true);
  //   try {
  //     const { data } = await authService.resetPassword(credentials);
  //     console.log(data);
  //     router.push("/login");
  //   } catch (err) {
  //     setError(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const signOut = async () => {
    setLoading(true);
    try {
      await signOutUser();
      setUser(null);
      setIsAuthenticated(false);
      router.push("/");
    } catch (error) {
      setError(error.message);
      console.error("Sign Out Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const singleUser = async (userId) => {
    setLoading(true);
    try {
      const userData = await getUserData(userId);
      setSingleUserData(userData);
      return userData;
    } catch (err) {
      setError(err);
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserByUserName = async (userName) => {
    try {
      const userData = await userByUserName(userName);
      return userData;
    } catch (err) {
      console.error("Error fetching user:", err);
      return null;
    }
  };

  const fetchUsers = async (userIds) => {
    setLoading(true);
    try {
      const users = await Promise.all(
        userIds?.map((userId) => singleUser(userId))
      );
      const validUsers = users.filter((user) => user !== null);
      setAllFollowing(validUsers);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const ProfilePic = async (base64Image) => {
    setLoading(true);
    try {
      const updatedData = await updateUserData(user?._id, {
        profilePic: base64Image,
      });
      setUser(updatedData);
    } catch (err) {
      setError(err);
      console.error("ProfilePic Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const ProfileSettings = async (credentials) => {
    setLoading(true);
    try {
      const updateData = await updateUserData(user?._id, credentials);
      setUser(updateData);
      router.push(`/${user.userName}`);
    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const GetAllUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setAllUsers(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const savePost = async (postId, userId, isSave, setIsSave) => {
    setIsSave(!isSave);
    try {
      await saveUserPost(postId, userId);
      if (!isSave) {
        setUser((prev) => ({
          ...prev,
          favorites: [...prev.favorites, postId],
        }));
      } else {
        setUser((prev) => ({
          ...prev,
          favorites: prev.favorites.filter((id) => id !== postId),
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFollow = async (userId, otherUserId, isFollow, setIsFollow) => {
    console.log(userId, "userid");
    console.log(otherUserId, "other user id ");
    try {
      const newFollowState = !isFollow[otherUserId];
      await followUser(userId, otherUserId);
      setIsFollow((prev) => ({
        ...prev,
        [otherUserId]: newFollowState,
      }));
    } catch (err) {
      console.log("Error following user:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        setUser,
        user,
        isAuthenticated,
        signIn,
        signUpFun,
        signOut,
        loading,
        error,
        ForgotPassword,
        // ResetPassword,
        isAuthLoading,
        singleUser,
        singleUserData,
        ProfilePic,
        ProfileSettings,
        setSingleUserData,
        setSearchUser,
        searchUser,
        fetchUsers,
        setAllFollowing,
        allFollowing,
        allUsers,
        GetAllUsers,
        savePost,
        handleFollow,
        isFollow,
        setIsFollow,
        fetchUserByUserName,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
