/** @format */
import { pageService } from "@/services/pageService";
import React, { createContext, useContext, useState } from "react";
const PagesContext = createContext();
export const PagesProvider = ({ children }) => {
  const [homePageData, setHomePageData] = useState([]);
  const [explorePageData, setExplorePageData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const homePage = async (limit) => {
    setLoading(true);
    try {
      const { data } = await pageService.homePage(limit);
      return data.data;
    } catch (err) {
      console.error(err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const explorePage = async (limit) => {
    setLoading(true);
    try {
      const { data } = await pageService.explorePage(limit);
      // setExplorePageData((prevData) => [...prevData, ...data.data]);
      return data.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <PagesContext.Provider
      value={{
        homePageData,
        homePage,
        explorePage,
        explorePageData,
        setHomePageData,
        setExplorePageData,
        loading,
        error,
      }}>
      {children}
    </PagesContext.Provider>
  );
};
export const usePage = () => useContext(PagesContext);
