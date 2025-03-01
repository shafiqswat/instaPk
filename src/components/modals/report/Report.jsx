/** @format */

import React from "react";
import Modal from "../modal/Modal";
import { ReportModalData } from "@/constants";
import { useAuth } from "@/context/AuthContext";

const Report = ({ showModal, setShowModal, userId, selectedUser }) => {
  const { handleFollow, isFollow, setIsFollow } = useAuth();
  const handleFollowUnFollow = async () => {
    await handleFollow(userId, selectedUser._id, isFollow, setIsFollow);
    setShowModal(false);
  };
  return (
    <div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        className='md:w-96 w-[80%]'>
        <ul className='text-center'>
          <li
            className='border-b p-3 text-sm cursor-pointer text-blue-500 font-semibold'
            onClick={handleFollowUnFollow}>
            {!isFollow[selectedUser?._id] ? "Follow" : "Unfollow"}
          </li>
          {ReportModalData.map((items, i) => (
            <li
              className={`border-b p-3 text-sm cursor-pointer ${
                items.text === "Report" || items.text === "Unfollow"
                  ? "text-red-500 font-semibold"
                  : ""
              }`}
              key={i}>
              {items.text}
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};

export default Report;
