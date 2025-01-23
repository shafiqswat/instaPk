/** @format */
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { removeHeaders, setHeaders } from "@/helpers/auth.helper";
import { authService } from "@/services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [singleUserData, setSingleUserData] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();
  useEffect(() => {
    validateSession();
  }, []);
  setTimeout(() => {
    setError(null);
  }, 5000);
  const validateSession = async () => {
    try {
      const { data } = await authService.validateToken();
      setUser(data.data);
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setIsAuthLoading(false);
    }
  };
  const signIn = async (credentials) => {
    setLoading(true);
    try {
      const { data } = await authService.signInRequest(credentials);
      console.log(data);
      setHeaders(data.data.token);
      setUser(data.data.user);
      console.log(data.data.user);
      setIsAuthenticated(true);
      router.push("/");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const signUpFun = async (credentials) => {
    setLoading(true);
    try {
      const { data } = await authService.signUpRequest(credentials);
      console.log("successfully signed up");
      router.push("/edit");
      setHeaders(data.data.token);
      setUser(data.data.user);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const ForgotPassword = async (credentials) => {
    setLoading(true);
    try {
      const { data } = await authService.forgotPassword(credentials);
      console.log(data);
      router.push("/reset-password");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const ResetPassword = async (credentials) => {
    setLoading(true);
    try {
      const { data } = await authService.resetPassword(credentials);
      console.log(data);
      router.push("/login");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      removeHeaders();
      setUser(null);
      setIsAuthenticated(false);
      router.push("/");
    } catch (error) {
      console.error("Sign Out Error:", error);
    } finally {
      setLoading(false);
    }
  };
  const singleUser = async (userId) => {
    setLoading(true);
    try {
      const { data } = await authService.singleUser(userId);
      setSingleUserData(data.data.user);
      return data.data.user;
    } catch (err) {
      setError(err);
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchUsers = async (userIds) => {
    setLoading(true);
    try {
      const users = await Promise.all(
        userIds?.map((userId) => singleUser(userId))
      );
      const validUsers = users.filter((user) => user !== null);
      setAllUsers(validUsers);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const ProfilePic = async (credentials) => {
    setLoading(true);
    try {
      const { data } = await authService.profilePicChange(credentials);
      if (data.message === "Profile picture updated successfully") {
        setUser((prev) => ({
          ...prev,
          profilePic: data.profilePic,
        }));
      }
      console.log("success", data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const ProfileSettings = async (credentials) => {
    setLoading(true);
    try {
      const { data } = await authService.profileSettings(credentials);
      setUser(data.data);
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
      const { data } = await authService.getAllUsers();
      return data.data.users;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
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
        ResetPassword,
        isAuthLoading,
        validateSession,
        singleUser,
        singleUserData,
        ProfilePic,
        ProfileSettings,
        setSingleUserData,
        fetchUsers,
        allUsers,
        GetAllUsers,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
