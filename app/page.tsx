'use client'

import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid'

const NOTES_KEY = 'notes'

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

const NotesModal = ({ open, handleClose, setNotes }: { open: boolean, handleClose: () => void, setNotes: React.Dispatch<React.SetStateAction<Note[]>> }) => {
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")

  const handleNewNote = () => {
    const rawNotes = localStorage.getItem(NOTES_KEY)
    try {
      const foundNotes: Note[] = rawNotes ? JSON.parse(rawNotes) : []
      const newNote: Note = {
        id: uuidv4(),
        title: title,
        content: content,
        createdTime: new Date().toISOString()
      }
      foundNotes.push(newNote)
      localStorage.setItem(NOTES_KEY, JSON.stringify(foundNotes))
      setNotes(foundNotes)
    } catch (e: unknown) {
      console.error(e)
    } finally {
      handleClose();
    }

  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box>
        <Typography variant="h6">Add New Note</Typography>
        <TextField label="Title" value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
        <TextField label="Content" value={content} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value)} />
        <Button onClick={handleNewNote}>Add Note</Button>
      </Box>
    </Modal>
  )
}