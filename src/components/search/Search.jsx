/** @format */

import { useSearch } from "@/context/SearchContext";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useCallback } from "react";

const Search = () => {
  const { userData, getUser, setUserData } = useSearch();
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const handleChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchValue(value);
      if (value.trim().length > 0) {
        getUser(value);
      }
    },
    [getUser]
  );

  // Clear input value
  const handleSearchClear = () => {
    setSearchValue("");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim().length > 0) {
      localStorage.setItem("searchValues", searchValue);
      getUser(searchValue);
    }
  };

  const handleClearAll = () => {
    localStorage.removeItem("searchValues");
    setUserData([]);
  };
  const handleClick = (item) => {
    router.push(`${item.userName}`);
  };
  return (
    <div className='shadow-xl border-r overflow-y-auto h-screen ps-[4.5rem] rounded-r-2xl bg-white'>
      <div className='p-5'>
        <h2 className='font-semibold text-2xl'>Search</h2>
        <div className='relative'>
          <form onSubmit={handleSearchSubmit}>
            <div className='relative'>
              <input
                type='text'
                className='border-none text-sm font-semibold focus:outline-none bg-gray-100 rounded mt-10 py-2 w-full px-4'
                placeholder='Search'
                value={searchValue}
                onChange={handleChange}
              />
              {searchValue && (
                <XCircle
                  className='absolute w-4 h-4 right-2 cursor-pointer bottom-2 z-50'
                  onClick={handleSearchClear}
                />
              )}
            </div>
          </form>
        </div>
      </div>
      <div className='w-full h-[1px] mt-7 bg-gray-300'></div>
      <div className='p-5'>
        {!searchValue && (
          <div className='flex justify-between'>
            <h2 className='font-semibold'>Recent</h2>
            <button
              className='font-semibold text-[#0095f6] hover:text-[#04376b] text-sm'
              onClick={handleClearAll}>
              Clear all
            </button>
          </div>
        )}
      </div>
      <ul>
        {userData?.map((item, index) => (
          <li
            className='ps-4 pe-7 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer mb-2'
            key={index}
            onClick={() => handleClick(item)}>
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
    </div>
  );
};

export default Search;
