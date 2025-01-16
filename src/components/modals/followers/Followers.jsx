/** @format */
import React, { useState, useEffect } from "react";
import Modal from "../modal/Modal";
import { CrossIcon } from "@/constants/SvgIcon";
import { SearchIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Followers = ({ showModal, setShowModal, user, isFollowing }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState("");
  const { fetchUsers, allUsers } = useAuth();
  const router = useRouter();
  const filteredUsers = allUsers.filter((user) =>
    user?.userName?.toLowerCase().includes(value.toLowerCase())
  );
  console.log(user);
  useEffect(() => {
    if (isFollowing) {
      fetchUsers(user.following);
    } else {
      fetchUsers(user.followers);
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
        {/* Search Input */}
        <form className='w-full flex justify-center p-2'>
          <div className='w-full relative'>
            <input
              type='text'
              placeholder='Search'
              className={`rounded outline-none focus:border-none py-1 w-full bg-gray-200 placeholder:text-xs ${
                isFocus ? "ring-2 pl-2" : "pl-7"
              }`}
              autoFocus={false}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              aria-label='Search followers'
              onChange={handleChange}
              value={value}
            />
            {!isFocus && (
              <SearchIcon className='absolute left-2 top-[0.6rem] w-4 h-4 text-gray-500' />
            )}
          </div>
        </form>
        <ul>
          {filteredUsers?.map((item, index) => (
            <li
              className='ps-4 pe-7 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer mb-2'
              key={index}
              onClick={() => router.push(`${item?.userName}`)}>
              <div className='w-11 h-11 rounded-full flex justify-center items-center'>
                <img
                  src={item?.profilePic}
                  className='rounded-full'
                />
              </div>
              <div>
                <h2 className='text-sm font-semibold'>{item?.userName}</h2>
                <p className='text-sm text-gray-400'>{item?.fullName}</p>
              </div>
              <div className='w-full flex justify-end'>
                <button className='bg-gray-200 font-bold text-sm py-1 px-3 rounded ms-auto'>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};

export default Followers;
