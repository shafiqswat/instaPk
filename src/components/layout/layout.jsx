/** @format */

"use client";
import { AuthProvider, useAuth } from "@/context/auth.context";
import React from "react";
import Loading from "../loading/Loading";
import Header from "./header/Header";
import { PostProvider } from "@/context/post.context";
import { SearchProvider } from "@/context/search.context";
import { NoteProvider } from "@/context/note.context";
import { CommentsProvider } from "@/context/comments.context";
import { ChatProvider } from "@/context/chat.context";
import { usePathname } from "next/navigation";
import { LikeProvider } from "@/context/likes.context";
import SidebarWrapper from "./sidebarWrapper/SidebarWrapper";
import Footer from "./footer/footer";

const LayoutContent = ({ children }) => {
  const { isAuthLoading, isAuthenticated, user } = useAuth();
  const pathName = usePathname();

  if (isAuthLoading) {
    return <Loading />;
  }

  return (
    <ChatProvider user={user || null}>
      {!pathName.includes("/message") && <Header />}
      <div className='flex overflow-x-hidden '>
        {isAuthenticated && <SidebarWrapper />}
        <div className='flex-1'>{children}</div>
        {isAuthenticated && <Footer />}
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
              <LikeProvider>
                <LayoutContent>{children}</LayoutContent>
              </LikeProvider>
            </CommentsProvider>
          </NoteProvider>
        </SearchProvider>
      </PostProvider>
    </AuthProvider>
  );
};

export default Layout;
