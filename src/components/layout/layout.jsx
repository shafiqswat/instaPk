/** @format */

/** @format */

"use client";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import React from "react";
import Loading from "../loading/Loading";
import Header from "./header/Header";
import SidebarWrapper from "./sidebar-wrapper/SidebarWrapper";
import { PostProvider } from "@/context/PostContext";
import { PagesProvider } from "@/context/PagesContext";
import { FollowProvider } from "@/context/FollowContext";
import { SearchProvider } from "@/context/SearchContext";
// import { FirebaseProvider } from "@/context/FirebaseContext";

const LayoutContent = ({ children }) => {
  const { isAuthLoading, isAuthenticated } = useAuth();

  if (isAuthLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Header />
      <div className='flex'>
        {isAuthenticated && <SidebarWrapper />}
        <div className='w-full'>{children}</div>
      </div>
    </div>
  );
};

const Layout = ({ children }) => {
  return (
    <AuthProvider>
      <PostProvider>
        <PagesProvider>
          <FollowProvider>
            <SearchProvider>
              {/* <FirebaseProvider> */}
              <LayoutContent>{children}</LayoutContent>
              {/* </FirebaseProvider> */}
            </SearchProvider>
          </FollowProvider>
        </PagesProvider>
      </PostProvider>
    </AuthProvider>
  );
};

export default Layout;
