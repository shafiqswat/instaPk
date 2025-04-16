/** @format */

"use client";
import Notes from "@/components/modals/notes/Notes";
import PictureModal from "@/components/modals/picture-modal/PictureModal";
import TabsCustom from "@/components/elements/tabs/Tabs";
import { CopyIcon, OptionIcon, ThreeDotsIcon } from "@/constants/SvgIcon";
import { useAuth } from "@/context/AuthContext";
import { Plus, UserPlus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProtectedRoute from "@/components/protected-route/ProtectedRoute";
import Loading from "@/components/loading/Loading";
import Followers from "@/components/modals/followers/Followers";
import Highlights from "@/components/modals/highlights/Highlights";
import { useNote } from "@/context/NoteContext";
import { useChat } from "@/context/chatContext";
import { usePost } from "@/context/PostContext";

const Profile = () => {
  const [isNoteModal, setIsNoteModal] = useState(false);
  const [highlightModal, setHighlightModal] = useState(false);
  const [profilePic, setProfilePic] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const { myPostsData } = usePost();

  const router = useRouter();
  const { setActiveThread } = useChat();
  const {
    user,
    fetchUserByUserName,
    searchUser,
    setSearchUser,
    isFollow,
    setIsFollow,
    handleFollow,
  } = useAuth();
  const { note } = useNote();

  const params = useParams();
  const slug = params.slug;
  const isCurrentUser = user?.userName === slug;

  /*<<<<<<<<<<<---------------------   Get User from the Slug or from params   ------------------------->>>>>>>>>>>>> */

  const fetchUser = async () => {
    setLoading(true);
    try {
      const userData = await fetchUserByUserName(slug); // Get user by username
      setSearchUser(userData);
    } catch (err) {
      console.error("Error fetching user data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchUser();
    }
  }, [slug]);

  /*<<<<<<<<<<<---------------------  Show this when the user is not in the database or not found  ------------------------->>>>>>>>>>>>> */

  if (!loading && !searchUser && !isCurrentUser) {
    return (
      <ProtectedRoute>
        <div className='flex justify-center items-center h-screen'>
          <p className='text-lg font-semibold text-gray-500'>User not found</p>
        </div>
      </ProtectedRoute>
    );
  }
  /*<<<<<<<<<<<---------------------   HandleMessage   ------------------------->>>>>>>>>>>>> */

  const handleMessage = (user) => {
    console.log("selected user for the text", user);
    if (!isCurrentUser) {
      router.push("/message");
      setActiveThread({
        otherUser: user,
        participants: [user?._id],
      });
    } else {
      console.log("");
    }
  };
  /*<<<<<<<<<<<---------------------   Loading   ------------------------->>>>>>>>>>>>> */

  if (loading) {
    return <Loading />;
  }

  return (
    <ProtectedRoute>
      <div className='w-full md:w-[calc(vw-18%)]   p-2 flex  flex-col  sm:grid  sm:grid-cols-3 gap-20 items-center'>
        {/*<<<<<<<<<<<---------------------   Note and user Profile Picture    ------------------------->>>>>>>>>>>>> */}

        <div className='col-span-1 flex justify-center mt-5 items-center relative'>
          <img
            src={isCurrentUser ? user?.profilePic : searchUser?.profilePic}
            alt='user'
            className='rounded-full w-40 h-40 cursor-pointer'
            onClick={() => setProfilePic(true)}
          />
          {isCurrentUser && (
            <div
              className='absolute -top-8 bg-white border p-2 rounded-xl cursor-pointer'
              onClick={() => setIsNoteModal(true)}>
              {
                <p className='text-gray-500  sm:text-[10px] overflow-y-scroll p-1'>
                  {note ? note?.note : " Note..."}
                </p>
              }
              <div className='absolute top-8 w-3 h-3 bg-white rounded-full'></div>
              <div className='w-1 h-1 rounded-full bg-white absolute top-11 left-4'></div>
            </div>
          )}
        </div>

        {/*<<<<<<<<<<<---------------------   User Profile data such as username , edit Profile, view archive etc   ------------------------->>>>>>>>>>>>> */}

        <div className='col-span-2 mt-5'>
          <div className='flex flex-wrap items-center xs:gap-5 gap-2'>
            <p className='text-lg font-medium cursor-pointer'>
              {isCurrentUser ? user?.userName : searchUser?.userName}
            </p>

            {/*<<<<<<<<<<<---------------------   Single Button for Follow or Following and Edit   ------------------------->>>>>>>>>>>>> */}

            <button
              className={`text-sm px-3 rounded-lg font-semibold p-2 ${
                !isFollow[searchUser?._id]
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => {
                isCurrentUser
                  ? router.push("/edit")
                  : handleFollow(
                      user._id,
                      searchUser._id,
                      isFollow,
                      setIsFollow
                    );
              }}>
              {isCurrentUser
                ? "Edit profile"
                : `${isFollow[searchUser?._id] ? "Following" : "Follow"}`}
            </button>

            {/*<<<<<<<<<<<--------------------- archive or message btn  , userPlus icon , option and three dots icon        ------------------------->>>>>>>>>>>>> */}

            <button
              className='text-sm px-3 rounded-lg bg-gray-200 font-semibold p-2'
              onClick={() => handleMessage(searchUser)}>
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

          {/*<<<<<<<<<<<---------------------   Post,follower and following   ------------------------->>>>>>>>>>>>> */}

          <div className='flex my-5 gap-3 sm:gap-5'>
            <p>
              <span className='font-semibold'>{myPostsData.length}</span> post
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

          {/*<<<<<<<<<<<---------------------   user FullName,bio, websiteUrl   ------------------------->>>>>>>>>>>>> */}

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

          {/*<<<<<<<<<<<---------------------   Dashboard   ------------------------->>>>>>>>>>>>> */}

          {isCurrentUser && (
            <div className='my-5 p-4 border bg-gray-200 rounded-xl w-fit cursor-pointer hover:bg-gray-300'>
              <p className='font-semibold text-sm'>Professional dashboard</p>
              <p className='text-sm text-gray-500'>
                1 accounts reached in the last 30 days.
              </p>
            </div>
          )}
        </div>
      </div>

      {/*<<<<<<<<<<<---------------------   Create Note   ------------------------->>>>>>>>>>>>> */}

      {isCurrentUser && (
        <div
          className='text-center w-fit px-5 sm:ps-20 cursor-pointer'
          onClick={() => setHighlightModal(true)}>
          <div className='w-20 h-20 outline outline-1 outline-gray-300 outline-offset-4 rounded-full flex items-center justify-center bg-gray-200'>
            <Plus className='w-11 h-11 text-gray-400' />
          </div>
          <p className='text-xs font-semibold mt-5'>New</p>
        </div>
      )}

      {/*<<<<<<<<<<<---------------------   Highlight Modal   ------------------------->>>>>>>>>>>>> */}

      <Highlights
        highlightModal={highlightModal}
        setHighlightModal={setHighlightModal}
      />

      {/*<<<<<<<<<<<---------------------   Note Modal   ------------------------->>>>>>>>>>>>> */}

      {isCurrentUser && (
        <Notes
          isNoteModal={isNoteModal}
          setIsNoteModal={setIsNoteModal}
        />
      )}

      {/*<<<<<<<<<<<---------------------   Tabs   ------------------------->>>>>>>>>>>>> */}

      <div className='sm:px-16 min-h-96 px-2 '>
        <TabsCustom
          searchUser={searchUser}
          isCurrentUser={isCurrentUser}
        />
      </div>

      {/*<<<<<<<<<<<---------------------  Profile Picture Change Modal   ------------------------->>>>>>>>>>>>> */}

      {isCurrentUser && (
        <PictureModal
          showModal={profilePic}
          setShowModal={setProfilePic}
        />
      )}

      {/*<<<<<<<<<<<---------------------   Follower and Following Modals   ------------------------->>>>>>>>>>>>> */}

      <Followers
        showModal={showFollowers}
        setShowModal={setShowFollowers}
        user={isCurrentUser ? user : searchUser}
        isCurrentUser={isCurrentUser}
        isFollowing={isFollowing}
      />
    </ProtectedRoute>
  );
};

export default Profile;
