/** @format */
"use client";
import { EmojiPickerIcon } from "@/constants/SvgIcon";
import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";

const TextArea = ({
  className,
  pickerStyle,
  textareaStyle,
  IconStyle,
  IconParentStyle,
  maxLength,
  placeholder = "Add a comment...",
  showEmojiPicker = true,
  value,
  onChange,
}) => {
  const [comment, setComment] = useState(value || "");
  const [emojiPicker, setEmojiPicker] = useState(false);
  const emojiRef = useRef(null);
  const emojiButtonRef = useRef(null);

  useEffect(() => {
    setComment(value || "");
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        emojiRef.current &&
        emojiButtonRef.current &&
        !emojiRef.current.contains(e.target) &&
        !emojiButtonRef.current.contains(e.target)
      ) {
        setEmojiPicker(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Handle emoji click and add it to the comment
  const handleEmojiClick = (emojiObject) => {
    const newComment = comment + emojiObject.emoji;
    setComment(newComment);
    onChange?.(newComment); // Call parent handler if provided
  };

  // Handle text change
  const handleTextChange = (e) => {
    const newValue = e.target.value;
    setComment(newValue);
    onChange?.(newValue); // Call parent handler if provided
  };

  return (
    <div className='mt-3 relative hidden md:block'>
      {/* <form> */}
      <textarea
        placeholder={placeholder}
        className={`${textareaStyle} border-b w-full placeholder:text-xs resize-none focus:outline-none`}
        value={comment}
        onChange={handleTextChange}
        maxLength={maxLength}
        aria-label='Text area'></textarea>
      {/* </form> */}
      {showEmojiPicker && (
        <div
          className={`${IconParentStyle} cursor-pointer absolute`}
          onClick={() => setEmojiPicker((prev) => !prev)}
          ref={emojiButtonRef}>
          <EmojiPickerIcon className={IconStyle} />
        </div>
      )}
      {emojiPicker && showEmojiPicker && (
        <div
          className={`${pickerStyle} absolute right-0 z-10`}
          ref={emojiRef}>
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            className={className}
          />
        </div>
      )}
    </div>
  );
};

export default TextArea;
