/** @format */

import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/firebaseErrorUtils";
import { noteService } from "@/services/note.service";
import React, { createContext, useContext, useState } from "react";
const NoteContext = createContext();
export const NoteProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [note, setNote] = useState("");
  const createNote = async (userId, notedData) => {
    setLoading(true);
    try {
      const data = await noteService.addNote(userId, notedData);
      toast({
        title: "Note Created",
        description: "Your profile Note has been Created Successfully.",
        variant: "success",
        duration: 1000,
      });
      setNote(data);
      console.log(note);
    } catch (err) {
      const message = getErrorMessage(err.message);
      toast({
        variant: "destructive",
        title: "Note Created Failed",
        description: message,
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
        duration: 1000,
      });
    } finally {
      setLoading(false);
    }
  };
  const getNote = async (userId) => {
    setLoading(true);
    try {
      const data = await noteService.getUserNote(userId);
      setNote(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const updateNote = async (userId, updatedData) => {
    toast({
      title: "Note Updated",
      description: "Your Note has been Updated Successfully.",
      variant: "success",
      duration: 1000,
    });
    setLoading(true);
    try {
      const data = await noteService.update(userId, updatedData);
      if (data) {
        setNote((prev) => ({
          ...prev,
          note: updatedData,
          updatedAt: data.updatedAt,
        }));
      }
      console.log("Updated Note:", data);
    } catch (err) {
      const message = getErrorMessage(err.message);
      toast({
        variant: "destructive",
        title: "Note Created Failed",
        description: message,
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
        duration: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (userId) => {
    setLoading(true);
    try {
      await noteService.deleteUserNote(userId);
      toast({
        title: "Note Deleted",
        description: "Your Note has been Deleted Successfully.",
        variant: "success",
        duration: 1000,
      });
      setNote("");
    } catch (err) {
      const message = getErrorMessage(err.message);
      toast({
        variant: "destructive",
        title: "Note Delete Failed",
        description: message,
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
        duration: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        createNote,
        updateNote,
        getNote,
        deleteNote,
        loading,
        error,
        note,
      }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNote = () => useContext(NoteContext);
