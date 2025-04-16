/** @format */

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
      setNote(data);
      console.log(note);
    } catch (err) {
      setError(err);
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
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (userId) => {
    setLoading(true);
    try {
      await noteService.deleteUserNote(userId);
      setNote("");
    } catch (err) {
      console.log(err);
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
