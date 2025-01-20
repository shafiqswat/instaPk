/** @format */

context / FirebaseContext.js;
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  useEffect(() => {}, []);

  return (
    <FirebaseContext.Provider value={{}}>{children}</FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
