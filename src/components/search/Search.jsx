/** @format */

import { useAuth } from "@/context/AuthContext";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import UserSuggestion from "../cards/user-suggestion/userSuggestion";
import { useSearch } from "@/context/SearchContext";

const Search = ({ className }) => {
  const { allUsers } = useAuth();
  const { userData, setUserData, getUser } = useSearch();
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.trim().length > 0) {
      getUser(value, allUsers);
    } else {
      setUserData([]);
    }
  };

  const handleSearchClear = () => {
    setSearchValue("");
    setUserData([]);
  };

  const handleClick = (item) => {
    router.push(`/${item.userName}`);
  };

  return (
    <div
      className={`shadow-xl border-r overflow-y-auto rounded-r-2xl bg-white ${className}`}>
      <div className='p-5'>
        <h2 className='font-semibold text-2xl'>Search</h2>
        <div className='relative'>
          <form>
            <input
              type='text'
              className='border-none text-sm font-semibold focus:outline-none bg-gray-100 rounded mt-10 py-2 w-full px-4'
              placeholder='Search'
              value={searchValue}
              onChange={handleChange}
            />
          </form>
          {searchValue && (
            <XCircle
              className='absolute w-4 h-4 right-2 cursor-pointer bottom-2 z-50'
              onClick={handleSearchClear}
            />
          )}
        </div>
      </div>

      {/* Suggestions List */}
      <UserSuggestion
        data={userData}
        onClick={handleClick}
      />
    </div>
  );
};

export default Search;
