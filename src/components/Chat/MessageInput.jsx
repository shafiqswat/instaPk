/** @format */
import React, { useRef, useState } from "react";
import {
  ChatGallery,
  EmojiPickerIcon,
  GifIcon,
  HurtIcon,
  VoiceIcon,
} from "@/constants/SvgIcon";
import { X } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

const MessageInput = ({
  newMessage,
  setNewMessage,
  onSend,
  onImageSelect,
  imagePreview,
  removeSelectedImage,
  isUploading,
}) => {
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const emojiRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleEmojiClick = (emojiObject) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
  };

  // Handle outside click to close emoji picker
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiRef.current &&
        !emojiRef.current.contains(event.target) &&
        !event.target.closest("#emoji-button")
      ) {
        setEmojiPickerVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Image Preview */}
      {imagePreview && (
        <div className='relative mb-4 mx-4'>
          <div className='relative inline-block'>
            <img
              src={imagePreview}
              alt='Preview'
              className='max-h-40 rounded-lg'
            />
            <button
              onClick={removeSelectedImage}
              className='absolute -top-2 -right-2 bg-gray-800 rounded-full p-1 hover:bg-gray-700'>
              <X className='w-4 h-4 text-white' />
            </button>
          </div>
        </div>
      )}

      {/* Message Input */}
      <form
        onSubmit={onSend}
        className='mt-4 flex gap-2 w-full relative'>
        <div className='relative flex items-center w-full'>
          {/* Left-side icons */}
          <div className='absolute left-3 flex items-center gap-2'>
            <button
              id='emoji-button'
              type='button'
              className='cursor-pointer'
              onClick={() => setEmojiPickerVisible((prev) => !prev)}>
              <EmojiPickerIcon className='w-5 h-5' />
            </button>
          </div>

          {/* Input Field */}
          <input
            type='text'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className='border py-2 pl-10 pr-14 rounded-full w-full focus:outline-none'
            placeholder={imagePreview ? "Add a caption..." : "Message..."}
          />

          {/* Right-side icons OR Send button */}
          <div className='absolute right-3 flex items-center gap-3'>
            {newMessage.trim() || imagePreview ? (
              <button
                type='submit'
                className='text-sm font-semibold text-blue-500'
                disabled={isUploading}>
                {isUploading ? "Sending..." : "Send"}
              </button>
            ) : (
              <>
                <VoiceIcon />
                <button
                  type='button'
                  onClick={() => fileInputRef.current.click()}>
                  <ChatGallery />
                </button>
                <GifIcon />
                <HurtIcon />
              </>
            )}
          </div>
        </div>
      </form>

      {/* Hidden File Input */}
      <input
        type='file'
        ref={fileInputRef}
        className='hidden'
        accept='image/*'
        onChange={onImageSelect}
      />

      {/* Emoji Picker */}
      {emojiPickerVisible && (
        <div
          ref={emojiRef}
          className='absolute bottom-20 left-10 z-50 bg-white border shadow-lg rounded-lg'>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </>
  );
};

export default MessageInput;
