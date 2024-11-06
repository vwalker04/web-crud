'use client'

import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

type Note = {
  id: string
  title: string
  content: string
  createdTime: string
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([])
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  useEffect(() => {
    const newNote: Note = {
      id: '2',
      title: 'title',
      content: 'foo',
      createdTime: new Date().toISOString()
    }
    localStorage.setItem('notes', JSON.stringify(newNote))
  }, [])

  useEffect(() => {
    const notesFromLocalStorage = localStorage.getItem('notes')
    if (notesFromLocalStorage) {
      const parsedNotes = JSON.parse(notesFromLocalStorage)
      setNotes([parsedNotes])
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
      <NotesModal open={modalOpen} handleClose={() => setModalOpen(false)} />
    </>
  );
}

const NotesModal = ({ open, handleClose }: { open: boolean, handleClose: () => void }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box>
        <Typography variant="h6">Add New Note</Typography>
        <TextField label="Title" />
        <TextField label="Content" />
        <Button>Add Note</Button>
      </Box>
    </Modal>
  )
}