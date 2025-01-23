/** @format */

import HoverCardCustom from "@/components/cards/hover-card/HoverCard";
import LoadingSkeleton from "@/components/elements/loading-skeleton/loadingSkeleton";
import { useAuth } from "@/context/AuthContext";
import { useFollow } from "@/context/FollowContext";
import { useFollowStatus } from "@/helpers/checkFollower.helper";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserSuggestion = () => {
  const { GetAllUsers, user, singleUser, singleUserData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [randomUsers, setRandomUsers] = useState([]);
  const router = useRouter();
  const { Follow, UnFollow } = useFollow();
  const { isFollow, toggleFollow } = useFollowStatus(user);
  /*<<<<<<<<<<<---------------------   fetch users  ------------------------->>>>>>>>>>>>> */

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const users = await GetAllUsers();
      getRandomUsers(users); // Trigger random selection after fetching users
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  /*<<<<<<<<<<<---------------------   get random users from the data  ------------------------->>>>>>>>>>>>> */

  const getRandomUsers = (users) => {
    if (users?.length) {
      const shuffled = [...users].sort(() => 0.5 - Math.random());
      const selectedUsers = shuffled.slice(0, 5);
      setRandomUsers(selectedUsers);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [router]);

  /*<<<<<<<<<<<--------------------- fetch User data on Mouse enter ------------------------->>>>>>>>>>>>> */

  const handleMouseEnter = (items) => {
    singleUser(items);
  };

  return (
    <div>
      {/*<<<<<<<<<<<---------------------  current user Data  ------------------------->>>>>>>>>>>>> */}

      <div className='flex items-center justify-center gap-2 mb-4'>
        <HoverCardCustom userData={user}>
          <img
            src={user.profilePic}
            alt='avatar'
            className='w-10 h-10 rounded-full cursor-pointer'
            onClick={() => router.push(`${user.userName}`)}
          />
        </HoverCardCustom>
        <div>
          <HoverCardCustom userData={user}>
            <h2
              className='font-semibold text-sm cursor-pointer '
              onClick={() => router.push(`${items.userName}`)}>
              {user?.userName}
            </h2>
          </HoverCardCustom>
          <p className='text-sm text-gray-400'>{user?.fullName}</p>
        </div>
        <p
          className={`ms-auto cursor-pointer text-xs font-semibold text-[#0095f6] hover:text-[#00376b]`}>
          Switch
        </p>
      </div>

      {/*<<<<<<<<<<<---------------------  Suggestion text  ------------------------->>>>>>>>>>>>> */}

      <div className='flex justify-between mb-5'>
        <h2 className='text-sm font-semibold text-gray-400'>
          Suggested for you
        </h2>
        <p className='text-sm text-gray-400 cursor-pointer font-semibold'>
          See All
        </p>
      </div>

      {/*<<<<<<<<<<<---------------------  Loading   ------------------------->>>>>>>>>>>>> */}

      {loading &&
        Array.from({ length: 5 }, (_, i) => {
          return (
            <LoadingSkeleton
              key={i}
              comments={true}
              suggestion={true}
            />
          );
        })}
      {/*<<<<<<<<<<<---------------------  Suggestion Data  ------------------------->>>>>>>>>>>>> */}

      {!loading &&
        randomUsers.map((items, i) => (
          <div
            className='flex items-center justify-center gap-2 mb-4'
            key={i}
            onMouseEnter={() => handleMouseEnter(items?._id)}>
            <HoverCardCustom userData={singleUserData}>
              <img
                onClick={() => router.push(`${items.userName}`)}
                src={items.profilePic}
                alt='avatar'
                className='w-10 h-10 rounded-full cursor-pointer'
              />
            </HoverCardCustom>
            <div>
              <HoverCardCustom userData={singleUserData}>
                <h2
                  className='font-semibold text-sm cursor-pointer overflow-hidden w-[100px] text-ellipsis'
                  onClick={() => router.push(`${items.userName}`)}>
                  {items.userName}
                </h2>
              </HoverCardCustom>
              <p className='text-sm text-gray-400'>Suggested for you</p>
            </div>
            {/*<<<<<<<<<<<---------------------   Check Follow  ------------------------->>>>>>>>>>>>> */}

            <p
              className={`ms-auto cursor-pointer text-xs font-semibold ${
                !isFollow[items?._id] ? "text-blue-500" : "text-gray-400"
              }`}
              onClick={() => toggleFollow(items._id, Follow, UnFollow)}>
              {!isFollow[items._id] ? "Follow" : "Following"}
            </p>
          </div>
        ))}
    </div>
  );
};

export default UserSuggestion;
