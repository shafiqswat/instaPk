/** @format */
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { userServices } from "@/services/user.service";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { getErrorMessage } from "@/lib/firebaseErrorUtils";

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
    const unsubscribe = userServices.onAuthStateChangedUser(
      async (currentUser) => {
        if (currentUser) {
          try {
            const userDoc = await userServices.getUserData(currentUser.uid);
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
        setError(null);
      }
    );

    return () => unsubscribe();
  }, []);

  // Sign-in method
  const signIn = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await userServices.login(email, password);
      toast({
        title: "Login Successful",
        description: "You have logged in successfully.",
        variant: "success",
        duration: 2000,
      });
      setUser(userData);
      setIsAuthenticated(true);
      router.push("/");
    } catch (err) {
      const message = getErrorMessage(err.message);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: message,
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
        duration: 2000,
      });
    } finally {
      setLoading(false);
      setError(null);
    }
  };

  // Sign-up method
  const signUpFun = async ({ email, password, fullName, userName }) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await userServices.register(
        email,
        password,
        fullName,
        userName
      );
      toast({
        title: "Signup Successful",
        description: "Account created! 🎉",
        variant: "success",
        duration: 2000,
      });
      setUser(userData);
      setIsAuthenticated(true);
      router.push("/edit");
    } catch (err) {
      const message = getErrorMessage(err.message);
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: message,
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
        duration: 2000,
      });
    } finally {
      setLoading(false);
      setError(null);
    }
  };

  // Forgot password method
  const ForgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    try {
      await userServices.forgotPassword(email);
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
      await userServices.signOutUser();
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully.",
        variant: "success",
        duration: 2000,
      });
      setUser(null);
      setIsAuthenticated(false);
      router.push("/");
    } catch (error) {
      const message = getErrorMessage(err.message);
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: message,
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
        duration: 2000,
      });
    } finally {
      setLoading(false);
      setError(null);
    }
  };

  const singleUser = async (userId) => {
    setLoading(true);
    try {
      const userData = await userServices.getUserData(userId);
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
      const userData = await userServices.userByUserName(userName);
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
      const updatedData = await userServices.updateUserData(user?._id, {
        profilePic: base64Image,
      });
      toast({
        title: "Profile Picture Updated",
        description: "Your profile picture has been successfully updated.",
        variant: "success",
        duration: 2000,
      });
      setUser(updatedData);
    } catch (err) {
      const message = getErrorMessage(err.message);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description:
          message || "Something went wrong while updating your picture.",
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const ProfileSettings = async (credentials) => {
    setLoading(true);
    try {
      const updateData = await userServices.updateUserData(
        user?._id,
        credentials
      );
      toast({
        title: "Profile Updated",
        description: "Your profile settings have been successfully updated.",
        variant: "success",
        duration: 2000,
      });
      setUser(updateData);
      router.push(`/${user.userName}`);
    } catch (err) {
      const message = getErrorMessage(err.message);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: message,
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const GetAllUsers = async () => {
    setIsAuthLoading(true);
    try {
      const data = await userServices.getAllUsers();
      setAllUsers(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const savePost = async (postId, userId, isSave, setIsSave) => {
    if (!postId || !userId) return;

    // Optimistic update
    const newSaveState = !isSave;
    setIsSave(newSaveState);

    try {
      await userServices.saveUserPost(postId, userId);
      toast({
        title: newSaveState ? "Post Saved" : "Post Unsaved",
        description: newSaveState
          ? "The post has been added to your favorites."
          : "The post has been removed from your favorites.",
        variant: "success",
        duration: 2000,
      });
      setUser((prev) => ({
        ...prev,
        favorites: newSaveState
          ? [...(prev.favorites || []), postId]
          : (prev.favorites || []).filter((id) => id !== postId),
      }));
    } catch (error) {
      const message = getErrorMessage(err.message);
      toast({
        variant: "destructive",
        title: "Failed to Update the post",
        description: message,
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
        duration: 2000,
      });
    }
  };

  const handleFollow = async (userId, otherUserId, isFollow, setIsFollow) => {
    try {
      const newFollowState = !isFollow[otherUserId];
      await userServices.followUser(userId, otherUserId);
      toast({
        title: newFollowState ? "Followed" : "Unfollowed",
        description: newFollowState
          ? `You are now following`
          : "You have unfollowed ",
        variant: "success",
        duration: 2000,
      });
      setIsFollow((prev) => ({
        ...prev,
        [otherUserId]: newFollowState,
      }));
    } catch (err) {
      const message = getErrorMessage(err.message);
      toast({
        variant: "destructive",
        title: "Follow Action Failed",
        description: message,
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
        duration: 2000,
      });
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
