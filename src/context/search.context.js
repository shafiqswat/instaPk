/** @format */

import React, { createContext, useContext, useState } from "react";
const SearchContext = createContext();
export const SearchProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const getUser = (searchTerm, allUsers) => {
    const filtered = allUsers.filter((user) => {
      return (
        user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setUserData(filtered);
  };
  return (
    <SearchContext.Provider value={{ userData, setUserData, getUser }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
