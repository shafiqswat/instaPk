/** @format */

import React from "react";
import { Dialog, DialogContent, DialogTitle } from "../../ui/dialog";

const Modal = ({ showModal, setShowModal, children, className }) => {
  return (
    <div>
      <Dialog
        open={showModal}
        onOpenChange={setShowModal}
        aria-labelledby='dialog-title'
        aria-describedby='dialog-description'>
        <DialogTitle></DialogTitle>
        <DialogContent className={`outline-none p-0 ${className}`}>
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Modal;
