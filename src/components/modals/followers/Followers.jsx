/** @format */
import React, { useState, useEffect } from "react";
import Modal from "../modal/Modal";
import { CrossIcon } from "@/constants/SvgIcon";
import { SearchIcon } from "lucide-react";
import { useAuth } from "@/context/auth.context";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Followers = ({
  showModal,
  setShowModal,
  user,
  isFollowing,
  isCurrentUser,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState("");
  const {
    fetchUsers,
    allFollowing,
    user: currentUser,
    isFollow,
    handleFollow,
    setIsFollow,
  } = useAuth();
  const router = useRouter();
  const filteredUsers = allFollowing.filter((user) =>
    user?.userName?.toLowerCase().includes(value.toLowerCase())
  );

  useEffect(() => {
    if (isFollowing) {
      fetchUsers(user?.following);
    } else {
      fetchUsers(user?.followers);
    }
  }, [user, isFollowing]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}>
        {/* Modal Header */}
        <div className='p-2 flex justify-between items-center border-b'>
          <div></div>
          <h2 className='font-semibold'>
            {isFollowing ? "Followings" : "Followers"}
          </h2>
          <button
            className='w-4 h-4 cursor-pointer'
            aria-label='Close Modal'
            onClick={() => setShowModal(false)}>
            <CrossIcon />
          </button>
        </div>

        {/* Search User */}
        <form className='w-full flex justify-center p-2'>
          <div className='w-full relative'>
            <input
              type='text'
              placeholder='Search'
              className={`rounded outline-none focus:border-none py-1 w-full bg-gray-200 placeholder:text-xs ${
                isFocus ? "ring-2 pl-2" : "pl-7"
              }`}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={handleChange}
              value={value}
            />
            {!isFocus && (
              <SearchIcon className='absolute left-2 top-[0.6rem] w-4 h-4 text-gray-500' />
            )}
          </div>
        </form>

        {/* Map over filtered users */}
        <ul>
          {filteredUsers?.map((item, index) => (
            <li
              key={index}
              className='ps-4 pe-7 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer mb-2'>
              <div
                className='w-11 h-11 rounded-full flex justify-center items-center'
                onClick={() => router.push(`${item?.userName}`)}>
                <Image
                  width={44}
                  height={44}
                  alt='User avatar'
                  src={item?.profilePic}
                  className='rounded-full'
                />
              </div>
              <div>
                <h2 className='text-sm font-semibold'>{item?.userName}</h2>
                <p className='text-sm text-gray-400'>{item?.fullName}</p>
              </div>

              {/* Button Container */}
              <div className='w-full flex justify-end'>
                {isCurrentUser ? (
                  <button
                    className={`font-semibold text-sm py-1 px-3 rounded ms-auto ${
                      !isFollow[item?._id]
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() =>
                      isFollowing &&
                      handleFollow(
                        currentUser?._id,
                        item?._id,
                        isFollow,
                        setIsFollow
                      )
                    }>
                    {isFollowing
                      ? isFollow[item?._id]
                        ? "Following"
                        : "Follow"
                      : "Remove"}
                  </button>
                ) : (
                  item._id !== currentUser?._id && (
                    <button
                      onClick={() =>
                        handleFollow(
                          currentUser?._id,
                          item?._id,
                          isFollow,
                          setIsFollow
                        )
                      }
                      className={`bg-blue-500 font-semibold text-sm py-1 px-3 rounded ms-auto ${
                        isFollow[item._id] ? "bg-gray-200" : "text-white"
                      }`}>
                      {isFollow[item?._id] ? "Following" : "Follow"}
                    </button>
                  )
                )}
              </div>
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};
export default Followers;
