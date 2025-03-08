/** @format */
import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "../../ui/dialog";

const Modal = ({ showModal, setShowModal, children, className, Title }) => {
  useEffect(() => {
    const handleBackButton = () => {
      if (showModal) {
        setShowModal(false); // Close modal
        window.history.pushState(null, "", window.location.href); // Prevent navigation
      }
    };

    if (showModal) {
      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", handleBackButton);
    }

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [showModal, setShowModal]);

  return (
    <Dialog
      open={showModal}
      onOpenChange={setShowModal}
      aria-labelledby='dialog-title'
      aria-describedby='dialog-description'>
      <DialogTitle>{Title}</DialogTitle>
      <DialogContent className={`outline-none p-0 ${className}`}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
