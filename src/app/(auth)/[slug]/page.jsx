/** @format */

"use client";
import Modal from "@/components/modals/modal/Modal";
import Notes from "@/components/modals/notes/Notes";
import PictureModal from "@/components/modals/picture-modal/PictureModal";
import TabsCustom from "@/components/elements/tabs/Tabs";
import { CopyIcon, OptionIcon, ThreeDotsIcon } from "@/constants/SvgIcon";
import { useAuth } from "@/context/AuthContext";
import { Plus, UserPlus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useFollow } from "@/context/FollowContext";
import ProtectedRoute from "@/components/protected-route/ProtectedRoute";
import { useSearch } from "@/context/SearchContext";
import Loading from "@/components/loading/Loading";
import Followers from "@/components/modals/followers/Followers";
import Highlights from "@/components/modals/highlights/Highlights";

const Profile = () => {
  const [isNoteModal, setIsNoteModal] = useState(false);
  const [highlightModal, setHighlightModal] = useState(false);

  const [profilePic, setProfilePic] = useState(false);
  const [searchUser, setSearchUser] = useState([]);
  const [showFollowers, setShowFollowers] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const { noteData } = useFollow();
  const { getUser, userData, loading } = useSearch();
  const [isFollowing, setIsFollowing] = useState(false);
  const params = useParams();
  const slug = params.slug;
  const isCurrentUser = user?.userName === slug;
  const { Follow, UnFollow } = useFollow();
  const [isFollow, setIsFollow] = useState(
    userData[0]?.followers?.includes(user?._id)
  );

  useEffect(() => {
    setIsFollow(userData[0]?.followers?.includes(user?._id));
  }, [userData]);

  const fetchUser = async () => {
    await getUser(slug);
  };

  useEffect(() => {
    fetchUser();
  }, [slug]);

  useEffect(() => {
    if (userData && userData.length > 0) {
      setSearchUser(userData[0]);
    } else {
      setSearchUser(null);
    }
  }, [userData]);

  const handleFollow = () => {
    if (isFollow) {
      UnFollow(userData[0]?._id, setIsFollow, isFollow);
    } else {
      Follow(userData[0]?._id, setIsFollow, isFollow);
    }
  };
  if (!loading && !searchUser && !isCurrentUser) {
    return (
      <ProtectedRoute>
        <div className='flex justify-center items-center h-screen'>
          <p className='text-lg font-semibold text-gray-500'>User not found</p>
        </div>
      </ProtectedRoute>
    );
  }
  if (loading) {
    return <Loading />;
  }

  return (
    <ProtectedRoute>
      <div className='grid grid-cols-3 gap-20'>
        <div className='col-span-1 flex justify-center items-center relative'>
          <img
            src={isCurrentUser ? user?.profilePic : searchUser?.profilePic}
            alt='user'
            className='rounded-full w-40 h-40 cursor-pointer'
            onClick={() => setProfilePic(true)}
          />
          <div
            className='absolute top-10 bg-white border p-2 rounded-xl cursor-pointer'
            onClick={() => setIsNoteModal(true)}>
            {
              <p className='text-gray-500 text-[10px]  overflow-y-scroll p-1'>
                {noteData ? noteData?.content : " Note..."}
              </p>
            }
            <div className='absolute top-8 w-3 h-3  bg-white rounded-full'></div>
            <div className='w-1 h-1 rounded-full bg-white absolute top-11 left-4'></div>
          </div>
        </div>

        <div className='col-span-2 mt-5'>
          <div className='flex items-center  gap-5'>
            <p className='text-lg font-medium cursor-pointer'>
              {isCurrentUser ? user?.userName : searchUser?.userName}
            </p>
            <button
              className={`text-sm px-3 rounded-lg font-semibold p-2 ${
                !isFollow ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => {
                isCurrentUser ? router.push("/edit") : handleFollow();
              }}>
              {isCurrentUser
                ? "Edit profile"
                : `${isFollow ? "Following" : "Follow"}`}
            </button>
            <button className='text-sm px-3 rounded-lg bg-gray-200 font-semibold p-2'>
              {isCurrentUser ? "View archive" : "Message"}
            </button>
            {!isCurrentUser && (
              <button className='text-sm px-3 rounded-lg bg-gray-200 font-semibold p-2'>
                <UserPlus className='w-4 h-4' />
              </button>
            )}
            <span className='cursor-pointer'>
              {isCurrentUser ? <OptionIcon /> : <ThreeDotsIcon />}
            </span>
          </div>
          <div className='flex my-5 gap-5'>
            <p>
              <span className='font-semibold'>
                {isCurrentUser ? user?.postCount : searchUser?.postCount}
              </span>{" "}
              post
            </p>
            <p
              className='cursor-pointer'
              onClick={() => {
                setShowFollowers(true);
                setIsFollowing(false);
              }}>
              <span className='font-semibold'>
                {isCurrentUser
                  ? user?.followersCount
                  : searchUser?.followersCount}
              </span>{" "}
              follower
            </p>
            <p
              className='cursor-pointer'
              onClick={() => {
                setShowFollowers(true);
                setIsFollowing(true);
              }}>
              <span className='font-semibold'>
                {isCurrentUser
                  ? user?.followingCount
                  : searchUser?.followingCount}
              </span>{" "}
              following
            </p>
          </div>
          <h2 className='text-sm font-semibold'>
            {isCurrentUser ? user?.fullName : searchUser?.fullName}
          </h2>
          <p className='text-sm'>
            {isCurrentUser ? user?.bio : searchUser?.bio}
          </p>
          <a
            href={isCurrentUser ? user.websiteUrl : searchUser?.websiteUrl}
            target='_blank'
            className='text-[#00376b] text-sm font-semibold hover:underline'>
            <span>
              <CopyIcon className='w-4 h-4 inline-flex mr-1' />
            </span>
            {isCurrentUser ? user?.websiteUrl : searchUser?.websiteUrl}
          </a>
          <div className='my-5 p-4 border bg-gray-200 rounded-xl w-fit cursor-pointer hover:bg-gray-300'>
            <p className='font-semibold text-sm'>Professional dashboard</p>
            <p className='text-sm text-gray-500'>
              1 accounts reached in the last 30 days.
            </p>
          </div>
        </div>
      </div>
      {isCurrentUser && (
        <div
          className='text-center w-fit ps-20 cursor-pointer'
          onClick={() => setHighlightModal(true)}>
          <div className='w-20 h-20 outline outline-1 outline-gray-300 outline-offset-4 rounded-full flex items-center justify-center bg-gray-200'>
            <Plus className='w-11 h-11 text-gray-400' />
          </div>
          <p className='text-xs font-semibold mt-5'>New</p>
        </div>
      )}
      <Highlights
        highlightModal={highlightModal}
        setHighlightModal={setHighlightModal}
      />

      {isCurrentUser && (
        <Notes
          isNoteModal={isNoteModal}
          setIsNoteModal={setIsNoteModal}
        />
      )}
      <div className='px-16'>
        <TabsCustom
          searchUserPosts={searchUser?.posts}
          searchUser={searchUser}
          isCurrentUser={isCurrentUser}
        />
      </div>
      {isCurrentUser && (
        <PictureModal
          showModal={profilePic}
          setShowModal={setProfilePic}
        />
      )}
      <Followers
        showModal={showFollowers}
        setShowModal={setShowFollowers}
        user={isCurrentUser ? user : userData[0]}
        isFollowing={isFollowing}
      />
    </ProtectedRoute>
  );
};

export default Profile;
