/** @format */

import React from "react";
import Modal from "../modal/Modal";
import { useComments } from "@/context/commentsContext";

const DeleteComments = ({ deleteModal, setDeleteModal, postId, commentId }) => {
  const { deleteComments } = useComments();

  const deleteData = [
    {
      text: "Delete",
      action: () => confirmDeleteComments(),
    },
    { text: "Cancel", action: () => setDeleteModal(false) },
  ];
  const confirmDeleteComments = () => {
    if (commentId) {
      deleteComments(postId, commentId);
    }
    setDeleteModal(false);
  };
  return (
    <Modal
      showModal={deleteModal}
      setShowModal={setDeleteModal}
      className='w-96'>
      <div>
        {deleteData.map((items, i) => (
          <div
            className={`p-3 text-center ${
              items.text == "Delete" && "border-b"
            }`}
            key={i}
            onClick={items.action}>
            <button
              className={`text-sm font-semibold ${
                items.text === "Delete" && "text-red-500"
              }`}>
              {items.text}
            </button>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default DeleteComments;
