/** @format */

import { useAuth } from "@/context/auth.context";
import {
  AudioCallIcon,
  ChatMessageIcon,
  MoreInfoIcon,
} from "@/constants/SvgIcon";
import React, { useState, useEffect, useRef } from "react";
import { useChat } from "@/context/chat.context";
import { useRouter } from "next/navigation";
import { Video } from "lucide-react";
import { uploadToCloudinary } from "@/helpers/cloudinaryUpload.helper";
import Modal from "../modals/modal/Modal";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";
import Image from "next/image";

const ChatWindow = () => {
  const [newMessage, setNewMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { activeThread, messages, sendMessageToUser, deleteMessageForUser } =
    useChat();
  const { user } = useAuth();
  const messagesEndRef = useRef(null);
  const router = useRouter();

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle image selection
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Remove selected image
  const removeSelectedImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  // Handle sending a message
  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() && !selectedImage) return;

    if (selectedImage) {
      setIsUploading(true);
      try {
        const imageUrl = await uploadToCloudinary(selectedImage);
        await sendMessageToUser(newMessage, imageUrl);
        setNewMessage("");
        setSelectedImage(null);
        setImagePreview(null);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsUploading(false);
      }
    } else {
      await sendMessageToUser(newMessage);
      setNewMessage("");
    }
  };

  // Handle message deletion
  const handleDeleteMessage = async (messageId, deleteForEveryone = false) => {
    if (!messageId) return;
    try {
      await deleteMessageForUser(messageId, deleteForEveryone);
      setShowDeleteModal(false);
      setSelectedMessage(null);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  if (!activeThread)
    return (
      <div className='flex flex-col w-full h-screen justify-center items-center gap-2'>
        <ChatMessageIcon />
        <h3 className='text-xl'>Your messages</h3>
        <p className='text-sm text-gray-500'>Send a message to start a chat.</p>
      </div>
    );

  return (
    <div className='flex flex-col h-full w-full overflow-hidden relative'>
      {/* Chat Header */}
      <div className='flex items-center gap-2 border-b pb-4 p-4 sticky top-0 bg-white z-10'>
        <Image
          width={40}
          height={40}
          onClick={() => router.push(`/${activeThread.otherUser.userName}`)}
          src={activeThread.otherUser.profilePic}
          className='w-10 h-10 rounded-full cursor-pointer'
          alt='Profile'
        />
        <h3
          className='font-semibold cursor-pointer'
          onClick={() => router.push(`/${activeThread.otherUser.userName}`)}>
          {activeThread.otherUser.userName}
        </h3>
        <div className='ms-auto flex items-center gap-3'>
          <AudioCallIcon />
          <Video className='w-6 h-6 cursor-pointer' />
          <MoreInfoIcon />
        </div>
      </div>

      {/* Messages Container */}
      <div className='flex-1 overflow-y-auto overflow-x-hidden'>
        <MessagesList
          messages={messages}
          currentUser={user}
          otherUserProfilePic={activeThread.otherUser.profilePic}
          onDeleteMessage={(messageId) => {
            setSelectedMessage(messages.find((msg) => msg._id === messageId));
            setShowDeleteModal(true);
          }}
        />
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className='p-4 border-t sticky bottom-11 sm:bottom-0 bg-white'>
        <MessageInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          onSend={handleSend}
          onImageSelect={handleImageSelect}
          imagePreview={imagePreview}
          removeSelectedImage={removeSelectedImage}
          isUploading={isUploading}
        />
      </div>

      {/* Delete Message Modal */}
      <Modal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}>
        <div className='p-4'>
          <h3 className='text-lg font-semibold mb-4'>Delete Message</h3>
          <div className='flex flex-col gap-2'>
            <button
              className='text-red-500 font-semibold py-2 border-b'
              onClick={() => handleDeleteMessage(selectedMessage?._id, true)}>
              Delete for Everyone
            </button>
            <button
              className='text-red-500 font-semibold py-2'
              onClick={() => handleDeleteMessage(selectedMessage?._id, false)}>
              Delete for Me
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ChatWindow;
