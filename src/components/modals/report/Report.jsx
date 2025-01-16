/** @format */

import React from "react";
import Modal from "../modal/Modal";
import { ReportModalData } from "@/constants";
import { useFollow } from "@/context/FollowContext";

const Report = ({ showModal, setShowModal, isFollow, setIsFollow, userId }) => {
  const { Follow, UnFollow } = useFollow();
  const handleFollow = async () => {
    if (!isFollow) {
      await Follow(userId, setIsFollow, isFollow);
      setShowModal(false);
    } else {
      await UnFollow(userId, setIsFollow, isFollow);
      setShowModal(false);
    }
  };
  return (
    <div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        className='w-96'>
        <ul className='text-center'>
          <li
            className='border-b p-3 text-sm cursor-pointer text-blue-500 font-semibold'
            onClick={handleFollow}>
            {!isFollow ? "Follow" : "Unfollow"}
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
