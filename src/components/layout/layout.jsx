/** @format */

"use client";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import React from "react";
import Loading from "../loading/Loading";
import Header from "./header/Header";
import SidebarWrapper from "./sidebar-wrapper/SidebarWrapper";
import { PostProvider } from "@/context/PostContext";
import { SearchProvider } from "@/context/SearchContext";
import { NoteProvider } from "@/context/NoteContext";
import { CommentsProvider } from "@/context/commentsContext";
import { ChatProvider } from "@/context/chatContext";

const LayoutContent = ({ children }) => {
  const { isAuthLoading, isAuthenticated, user } = useAuth();

  if (isAuthLoading) {
    return <Loading />;
  }

  return (
    <ChatProvider user={user || null}>
      <Header />
      <div className='flex overflow-x-hidden'>
        {isAuthenticated && <SidebarWrapper />}
        <div className='flex-1'>{children}</div>
      </div>
    </ChatProvider>
  );
};

const Layout = ({ children }) => {
  return (
    <AuthProvider>
      <PostProvider>
        <SearchProvider>
          <NoteProvider>
            <CommentsProvider>
              <LayoutContent>{children}</LayoutContent>
            </CommentsProvider>
          </NoteProvider>
        </SearchProvider>
      </PostProvider>
    </AuthProvider>
  );
};

export default Layout;
