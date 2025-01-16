/** @format */

"use client";
import React, { useState, useRef } from "react";
import Modal from "../../modals/modal/Modal";
import { MediaIcon, OpenGalleryIcon } from "@/constants/SvgIcon";
import { ArrowLeft, PlusIcon, XIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { usePost } from "@/context/PostContext";
import FilePreview from "@/components/modals/file-preview/FilePreview";
import DiscardConfirmationModal from "@/components/modals/discard-confirmation/DiscardConfirmation";
import Loading from "@/components/loading/Loading";
import { useFollow } from "@/context/FollowContext";

const Post = ({ showModal, setShowModal, story }) => {
  const [image, setImage] = useState([]);
  const [preview, setPreview] = useState([]);
  const [discardPost, setDiscardPost] = useState(false);
  const [caption, setCaption] = useState(false);
  const [captionValue, setCaptionValue] = useState("");
  const [popover, setPopover] = useState(false);
  const { uploadStory } = useFollow();
  const { user } = useAuth();
  const { handlePostWithCaption, loading } = usePost();
  const inputRef = useRef();

  // Handle file input change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImage((prev) => [...prev, ...files]);
      setPreview((prev) => [
        ...prev,
        ...files.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  // Handle post share
  const handleSharePost = async () => {
    const formData = new FormData();
    if (story) {
      image.forEach((img) => formData.append("image", img));
      uploadStory({ data: formData });
    } else {
      image.forEach((img) => formData.append("images", img));
      handlePostWithCaption({ credentials: formData, caption: captionValue });
    }

    resetPost();
    setShowModal(false);
  };

  // Reset all post data
  const resetPost = () => {
    setDiscardPost(false);
    setPreview([]);
    setImage([]);
    setCaption(false);
    setCaptionValue("");
  };

  return (
    <div>
      {/* Main Post Modal */}
      <Modal
        className={`overflow-hidden z-50 ${caption ? "min-w-[55%]" : ""}`}
        showModal={showModal}
        setShowModal={setShowModal}>
        <PostHeader
          preview={preview}
          caption={caption}
          onDiscard={() => setDiscardPost(true)}
          onNext={() => setCaption(true)}
          onShare={handleSharePost}
        />
        {preview.length > 0 ? (
          <FilePreview
            preview={preview}
            caption={caption}
            user={user}
            captionValue={captionValue}
            setCaptionValue={setCaptionValue}
            popover={popover}
            togglePopover={() => setPopover(!popover)}
            handleImageChange={handleImageChange}
            inputRef={inputRef}
            setPreview={setPreview}
          />
        ) : (
          <UploadPlaceholder inputRef={inputRef} />
        )}
      </Modal>

      {/* Discard Post Modal */}
      <DiscardConfirmationModal
        discardPost={discardPost}
        setDiscardPost={setDiscardPost}
        handleDiscardPost={resetPost}
      />

      {/* Hidden File Input */}
      <input
        type='file'
        className='hidden'
        accept='image/*'
        onChange={handleImageChange}
        ref={inputRef}
        multiple
      />
    </div>
  );
};

// Post Header Component
const PostHeader = ({
  preview,
  caption,
  onDiscard,
  onNext,
  onShare,
  loading,
}) => (
  <div
    className={`border-b py-3 text-center ${
      preview.length > 0 ? "flex justify-between px-2" : ""
    }`}>
    {preview.length > 0 ? (
      <>
        <ArrowLeft
          className='cursor-pointer'
          onClick={onDiscard}
        />
        <h2 className='font-semibold text-sm'>
          {caption ? "Create new post" : "Crop"}
        </h2>
        <button
          className='text-sky-500 font-semibold'
          onClick={caption ? onShare : onNext}>
          {caption ? loading ? <Loading /> : "Share" : "Next"}
        </button>
      </>
    ) : (
      <h2 className='font-semibold text-sm'>Create new post</h2>
    )}
  </div>
);

// Upload Placeholder Component
const UploadPlaceholder = ({ inputRef }) => (
  <div className='flex flex-col gap-3 h-96 justify-center items-center'>
    <MediaIcon />
    <h3 className='text-xl'>Drag photos and videos here</h3>
    <button
      className='text-sm text-white font-semibold px-6 rounded py-1 bg-sky-500'
      onClick={() => inputRef.current.click()}>
      Select from computer
    </button>
  </div>
);

export default Post;
