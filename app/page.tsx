'use client'

import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NotesModal from "./components/NotesModal";


export const NOTES_KEY = 'notes'

export type Note = {
  id: string
  title: string
  content: string
  createdTime: string
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([])
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  useEffect(() => {
    const notesFromLocalStorage = localStorage.getItem(NOTES_KEY)
    if (notesFromLocalStorage) {
      const parsedNotes = JSON.parse(notesFromLocalStorage)
      setNotes(parsedNotes)
    }
  }, [setNotes])

  if (!notes) return <div>No Notes Found</div>

  return (
    <>
      <div>
        {notes && notes.map((note, index) => {
          return (
            <div key={index}>
              <h6>{note.title}</h6>
              <p>{note.content}</p>
            </div>
          );
        })}
      </div>
      <Button onClick={() => setModalOpen(true)}>Add Note</Button>
      <NotesModal open={modalOpen} handleClose={() => setModalOpen(false)} setNotes={setNotes}/>
    </>
  );
}
