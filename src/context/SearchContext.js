/** @format */

import { searchService } from "@/services/searchService";
import React, { createContext, useContext, useState } from "react";
const SearchContext = createContext();
export const SearchProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState([]);
  const getUser = async (userName) => {
    setLoading(true);
    try {
      const { data } = await searchService.getUser(userName);
      setUserData(data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SearchContext.Provider
      value={{ getUser, loading, userData, setUserData, error }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
