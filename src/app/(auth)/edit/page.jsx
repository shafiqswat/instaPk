/** @format */
"use client";
import PictureModal from "@/components/modals/picture-modal/PictureModal";
import ProtectedRoute from "@/components/protected-route/ProtectedRoute";
import { useAuth } from "@/context/auth.context";
import React, { useState } from "react";

const Edit = () => {
  const { user, ProfileSettings, loading, error } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState(user?.websiteUrl || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [showSuggestions, setShowSuggestions] = useState(
    user?.isPublic || false
  );

  const handleCheckboxChange = (e) => {
    setShowSuggestions(e.target.checked);
  };

  const handleSelectChange = (e) => {
    setGender(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    ProfileSettings({
      websiteUrl: websiteUrl,
      gender: gender,
      bio: bio,
      isPublic: showSuggestions,
    });
  };

  return (
    <ProtectedRoute>
      <div className='p-10'>
        <form onSubmit={handleSubmit}>
          <h2 className='font-bold text-lg'>Edit Profile</h2>
          <div className='flex items-center justify-between p-5 rounded-2xl bg-gray-100 mt-5'>
            <div className='flex gap-3 items-center'>
              <img
                src={user?.profilePic}
                alt='user'
                className='w-16 h-16 rounded-full cursor-pointer'
                onClick={() => setShowModal(true)}
              />
              <div>
                <h2 className='font-bold'>{user?.userName}</h2>
                <p className='text-sm text-gray-600'>{user?.fullName}</p>
              </div>
            </div>
            <button
              className='text-white bg-blue-500 py-1 px-4 rounded text-sm font-semibold'
              type='button'
              onClick={() => setShowModal(true)}>
              Change photo
            </button>
          </div>
          <h2 className='font-bold text-lg my-5'>Website</h2>
          <input
            className='border py-2 px-4 w-full rounded-xl bg-gray-100'
            type='url'
            value={websiteUrl}
            placeholder={user?.websiteUrl || "Enter Website Url"}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            required
          />
          <p className='text-xs text-gray-600 mt-2'>
            Editing your links is only available on mobile. Visit the Instagram
            app and edit your profile to change the websites in your bio.
          </p>
          <h2 className='font-bold text-lg my-5'>Bio</h2>
          <div className='relative'>
            <textarea
              placeholder={user?.bio || "Add a bio"}
              className='w-full border resize-none rounded-xl py-2 px-4'
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={150}
              required></textarea>
            <p className='absolute right-4 bottom-4 text-xs'>
              {bio.length} / 150
            </p>
          </div>
          <h2 className='font-bold text-xl my-5'>Gender</h2>
          <select
            className='w-full border p-4 rounded-xl appearance-none'
            value={gender}
            onChange={handleSelectChange}
            required>
            <option
              value=''
              disabled>
              Select your gender
            </option>
            <option value='female'>Female</option>
            <option value='male'>Male</option>
            <option value='custom'>Custom</option>
            <option value='not'>Prefer not to say</option>
          </select>
          <p className='text-xs text-gray-600 mt-2'>
            This won’t be part of your public profile.
          </p>
          <h2 className='text-lg font-bold my-5'>
            Show account suggestions on profiles
          </h2>
          <div className='border p-5 rounded-xl flex justify-between'>
            <div>
              <h3 className='font-medium'>
                Show account suggestions on profiles
              </h3>
              <p className='text-xs text-gray-600'>
                Choose whether people can see similar account suggestions on
                your profile, and whether your account can be suggested on other
                profiles.
              </p>
            </div>
            <label className='inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                checked={showSuggestions}
                onChange={handleCheckboxChange}
                className='sr-only peer'
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black"></div>
            </label>
          </div>
          <div className='flex justify-end mt-5'>
            {error && <p>{error.message}</p>}
            <button
              className='text-white bg-blue-500 w-60 rounded h-10'
              type='submit'>
              {loading ? (
                <div className='parent-container'>
                  <div className='spinner'></div>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
          <PictureModal
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default Edit;
