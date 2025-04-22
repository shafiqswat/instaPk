/** @format */

import React from "react";
import Modal from "../modal/Modal";
import Image from "next/image";
import { CalendarDays } from "lucide-react";

const AccountInformation = ({ showModal, setShowModal, selectedUser }) => {
  return (
    <div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        className='w-[400px]'>
        <div className='w-full h-full bg-white rounded-full'>
          <h2 className='text-base text-center font-semibold py-2'>
            About this account
          </h2>
          <hr />
          <div className='flex flex-col items-center justify-center gap-3 w-80 text-center mx-auto'>
            {selectedUser && (
              <Image
                src={selectedUser?.profilePic}
                alt='user'
                width={78}
                height={78}
                className='rounded-full mt-4'
              />
            )}
            <h2>{selectedUser?.userName}</h2>
            <p className='text-xs text-gray-600'>
              To help keep our community authentic, we’re showing information
              about accounts on Instagram.{" "}
              <span className='text-[#00376B] font-semibold'>
                See why this information is important.
              </span>
            </p>
          </div>
          <div className='flex items-center gap-2 p-2'>
            <CalendarDays />
            <div>
              <p>Date joined</p>
              <p className='text-sm text-gray-500'>
                {selectedUser?.createdAt &&
                  new Date(
                    selectedUser.createdAt.seconds * 1000 +
                      selectedUser.createdAt.nanoseconds / 1e6
                  ).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
              </p>
            </div>
          </div>
          <div className='flex items-center justify-center border-t mt-2 h-10'>
            <button onClick={() => setShowModal(false)}>close</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AccountInformation;
