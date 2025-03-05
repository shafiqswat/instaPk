/** @format */

import React from "react";

const UserSuggestion = ({ data, onClick }) => {
  return (
    <ul>
      {data.map((item, index) => (
        <li
          className='ps-4 pe-7 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer mb-2'
          key={index}
          onClick={() => onClick(item)}>
          <div className='w-11 h-11 rounded-full border flex justify-center items-center'>
            <img
              src={item.profilePic}
              className='rounded-full'
            />
          </div>
          <div>
            <h2 className='text-sm font-semibold'>{item.userName}</h2>
            <p className='text-sm text-gray-400'>{item.fullName}</p>
          </div>
          <div className='ms-auto w-4 h-4'></div>
        </li>
      ))}
    </ul>
  );
};

export default UserSuggestion;
