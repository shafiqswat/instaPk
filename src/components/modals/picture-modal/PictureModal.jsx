/** @format */

"use client";
import React, { useRef } from "react";
import Modal from "../modal/Modal";
import { useAuth } from "@/context/auth.context";
import convertImageToBase64, {
  uploadToCloudinary,
} from "@/helpers/cloudinaryUpload.helper";

const PictureModal = ({ showModal, setShowModal }) => {
  const modalData = ["Upload Photo", "Remove Current Photo", "Cancel"];
  const fileInputRef = useRef(null);
  const { ProfilePic } = useAuth();

  const handleAction = (action) => {
    switch (action) {
      case "Upload Photo":
        fileInputRef.current.click();
        break;
      case "Remove Current Photo":
        ProfilePic(
          "https://res.cloudinary.com/dulovaduo/image/upload/v1731394549/profile_pics/bgsrd2kzajvtk86gzkbd.jpg"
        );
        break;
      case "Cancel":
        setShowModal(false);
        break;
      default:
        break;
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const cloudinaryImage = await uploadToCloudinary(file);
        ProfilePic(cloudinaryImage);
        setShowModal(false);
      } catch (error) {
        console.error("Error converting image to base64", error);
      }
    }
  };

  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      className='w-96 text-center'>
      <div>
        <div className='flex items-center justify-center p-5 border-b'>
          <h3 className='text-xl'>Change Profile Photo</h3>
        </div>
        <input
          type='file'
          className='hidden'
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        {modalData.map((item, i) => (
          <div
            className={`flex items-center justify-center h-12 border-b ${
              item === "Cancel" ? "border-none" : ""
            }`}
            key={i}>
            <button
              className={`text-[15px] p-2 ${
                item === "Remove Current Photo"
                  ? "text-red-500 font-semibold"
                  : ""
              } ${
                item === "Upload Photo" ? "text-blue-500 font-semibold" : ""
              }`}
              aria-label={`Perform action: ${item}`}
              onClick={() => handleAction(item)}>
              {item}
            </button>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default PictureModal;
