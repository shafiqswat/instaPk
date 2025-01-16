/** @format */
"use client";
import React, { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { CrossIcon, EmojiPickerIcon } from "@/constants/SvgIcon";
import { useFollow } from "@/context/FollowContext";
import { useAuth } from "@/context/AuthContext";

const Notes = ({ isNoteModal, setIsNoteModal }) => {
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const [rows, setRows] = useState(1);
  const { createNote, loading, getNote, noteData, updateNote, deleteNote } =
    useFollow();
  const handleOnChange = (e) => {
    const value = e.target.value;

    if (value.length > 60) return;

    setContent(value);

    if (value.length > 40) {
      setRows(3);
    } else if (value.length > 20) {
      setRows(2);
    } else {
      setRows(1);
    }
  };
  const handleCreateNote = async () => {
    if (noteData) {
      if (content.length > 0) {
        await updateNote({ content });
        setIsNoteModal(false);
      }
    } else {
      if (content.length > 0) {
        await createNote({ content });
        setIsNoteModal(false);
      }
    }
  };
  const handleDelete = async () => {
    await deleteNote();
    setIsNoteModal(false);
  };
  useEffect(() => {
    getNote();
  }, []);
  return (
    <Modal
      showModal={isNoteModal}
      setShowModal={setIsNoteModal}
      className=''>
      <div className='flex justify-between px-4 py-5 border-b'>
        <CrossIcon
          className='w-5 h-5 cursor-pointer'
          onClick={() => setIsNoteModal(false)}
        />
        <h2 className='font-bold text-xl'>New note</h2>
        <button
          className={`border-none font-semibold ${
            content.length > 0 ? "text-blue-500" : "text-gray-600 "
          }`}
          onClick={handleCreateNote}>
          {loading ? (
            <div className='parent-container'>
              <div className='spinner'></div>
            </div>
          ) : noteData ? (
            "Update"
          ) : (
            "share"
          )}
        </button>
      </div>
      <div className='relative flex flex-col items-center justify-center'>
        <img
          src={user.profilePic}
          alt='user'
          className='rounded-full w-36 h-36'
        />
        <div className='absolute bottom-48 bg-white border py-4 px-2 rounded-xl cursor-pointer'>
          <textarea
            className='text-gray-500 w-48 text-xl resize-none overflow-y-scroll focus:outline-none'
            placeholder={noteData ? noteData.content : "Share a thought...."}
            value={content}
            onChange={(e) => handleOnChange(e)}
            rows={rows}
            maxLength={60}></textarea>
          <div className='absolute -bottom-3 left-9 transform -translate-x-1/2 w-5 h-5 bg-white rounded-full border-t border-l'></div>
          <div className='absolute -bottom-5 left-12 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full border-t border-l'></div>
        </div>
        {/* {noteData && ( */}
        <button
          className={`text-gray-600 font-semibold my-2 hover:text-blue-500 `}
          onClick={noteData ? handleDelete : handleCreateNote}>
          {noteData ? "Delete Note" : "Share"}
        </button>
        {/* )} */}
      </div>
    </Modal>
  );
};

export default Notes;
