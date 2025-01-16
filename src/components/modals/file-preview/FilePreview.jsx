/** @format */
import React from "react";
import { PlusIcon, XIcon } from "lucide-react";
import { OpenGalleryIcon } from "@/constants/SvgIcon";
import TextArea from "@/components/form-items/textarea/TextArea";

const FilePreview = ({
  preview,
  caption,
  user,
  captionValue,
  setCaptionValue,
  popover,
  togglePopover,
  handleImageChange,
  inputRef,
  setPreview,
}) => {
  return (
    <div className={`${caption ? "grid grid-cols-7" : ""}`}>
      <div className='col-span-4 border-r'>
        <img
          src={preview[0]}
          alt='upload'
          className='w-full h-auto'
        />
        {!caption && (
          <>
            <PopoverGallery
              preview={preview}
              popover={popover}
              handleImageChange={handleImageChange}
              inputRef={inputRef}
              setPreview={setPreview}
            />
            <button
              className='w-10 h-10 bg-black hover:bg-gray-700 rounded-full absolute cursor-pointer bottom-10 right-10 flex items-center justify-center'
              onClick={togglePopover}>
              <OpenGalleryIcon />
            </button>
          </>
        )}
      </div>
      {caption && (
        <div className='overflow-y-scroll col-span-3'>
          <div className='flex items-center gap-3 p-2'>
            <img
              src={user?.profilePic}
              alt='user'
              className='w-10 h-10 rounded-full'
            />
            <h2 className='text-sm font-semibold'>{user?.userName}</h2>
          </div>
          <TextArea
            className='!w-72'
            placeholder=''
            textareaStyle='px-2 h-40 relative'
            maxLength={2200}
            IconStyle='w-5 h-5'
            IconParentStyle='left-4 top-32 absolute'
            value={captionValue}
            onChange={(newValue) => setCaptionValue(newValue)}
          />
        </div>
      )}
    </div>
  );
};
const PopoverGallery = ({ preview, popover, inputRef, setPreview }) => {
  const removeImg = (index) => {
    setPreview(preview.filter((_, i) => i !== index));
  };
  return (
    <div
      className={`${
        popover
          ? "absolute bottom-24 right-5 p-3 rounded-xl bg-[rgba(26,26,26,.8)]"
          : "hidden"
      }`}>
      <div className='flex gap-4'>
        {preview.map((item, i) => (
          <div
            className='relative'
            key={i}>
            <img
              src={item}
              alt='all'
              className='w-24 h-24'
            />
            <div className='bg-[rgba(26,26,26,.8)] w-5 h-5 flex items-center justify-center absolute right-2 top-1 rounded-full'>
              <XIcon
                className='text-white w-4 h-4 cursor-pointer'
                onClick={() => removeImg(i)}
              />
            </div>
          </div>
        ))}
        <div
          className='w-12 h-12 ms-3 flex justify-center items-center border border-white rounded-full cursor-pointer'
          onClick={() => inputRef.current.click()}>
          <PlusIcon className='w-5 h-5 text-gray-500' />
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
