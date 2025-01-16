/** @format */

import React from "react";
import Modal from "../../modals/modal/Modal";

const DiscardConfirmationModal = ({
  discardPost,
  setDiscardPost,
  handleDiscardPost,
}) => (
  <Modal
    className='w-96 text-center'
    showModal={discardPost}
    setShowModal={setDiscardPost}>
    <h2 className='text-xl font-semibold pt-4'>Discard post?</h2>
    <p className='text-sm text-gray-600'>
      If you leave, your edits won't be saved.
    </p>
    <div className='p-2 text-sm text-red-400 font-semibold border-y'>
      <button onClick={handleDiscardPost}>Discard</button>
    </div>
    <div className='p-2 text-sm font-semibold'>
      <button onClick={() => setDiscardPost(false)}>Cancel</button>
    </div>
  </Modal>
);

export default DiscardConfirmationModal;
