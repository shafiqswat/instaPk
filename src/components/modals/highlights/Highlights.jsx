/** @format */
import React, { useState } from "react";
import Modal from "../modal/Modal";
import { CrossIcon } from "@/constants/SvgIcon";
import { ChevronLeftIcon } from "lucide-react";

const Highlights = ({ highlightModal, setHighlightModal }) => {
  const [content, setContent] = useState("");
  const [storyModal, setStoryModal] = useState(false);
  const handleHighlights = () => {
    if (content.length > 0 && content.trim() !== "") {
      setStoryModal(true);
    }
  };
  return (
    <div>
      <Modal
        showModal={highlightModal}
        setShowModal={setHighlightModal}
        className='w-96'>
        <div className='flex justify-between p-2 border-b'>
          <div></div>
          <h2 className='text-sm font-semibold'>New Highlight</h2>
          <CrossIcon
            className='w-5 h-5 cursor-pointer'
            onClick={() => setHighlightModal(false)}
          />
        </div>
        <div className='p-3 border-b'>
          <input
            type='text'
            className='border w-full p-2 focus:outline-none rounded-lg placeholder:text-sm bg-gray-100'
            placeholder='Highlight Name'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className='text-center'>
          <button
            onClick={() => handleHighlights()}
            className={`border-none pb-2 text-sm font-semibold ${
              content.length > 0 && content.trim() !== ""
                ? "text-blue-500"
                : "text-gray-600"
            }`}>
            Next
          </button>
        </div>
      </Modal>
      <Modal
        showModal={storyModal}
        setShowModal={setStoryModal}
        className='w-[450px]'>
        <div className='p-2 border-b flex justify-between'>
          <ChevronLeftIcon
            onClick={() => setStoryModal(false)}
            className='cursor-pointer'
          />
          <h2 className='text-sm font-semibold'>Stories</h2>
          <CrossIcon
            className='w-5 h-5 cursor-pointer'
            onClick={() => setStoryModal(false)}
          />
        </div>
        <div className='h-[450px] border-b'></div>
        <div className='text-center pb-2'>
          <button className='border-none font-semibold text-sm'>Next</button>
        </div>
      </Modal>
    </div>
  );
};

export default Highlights;
