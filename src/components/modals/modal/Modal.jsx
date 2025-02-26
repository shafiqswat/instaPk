/** @format */

import React from "react";
import { Dialog, DialogContent, DialogTitle } from "../../ui/dialog";
import { Title } from "@radix-ui/react-dialog";

const Modal = ({ showModal, setShowModal, children, className, Title }) => {
  return (
    <div>
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
    </div>
  );
};

export default Modal;
