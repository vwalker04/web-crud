'use client'

import { Box, Button, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import React, { useEffect, useState } from "react";
import NotesModal from "./components/NotesModal";
import Link from "next/link";


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
      <Box {...styles.box}>
        {notes && notes.map((note, index) => {
          return (
            <Grid container key={index} gap={2} {...styles.grid}>
              <Typography>{note.title}</Typography>
              <Typography>{note.content}</Typography>
              <Link href={`/note/${note.id}`}><Button>Details</Button></Link>
            </Grid>
          );
        })}
        <Button onClick={() => setModalOpen(true)}>Add Note</Button>
      </Box>
      <NotesModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        setNotes={setNotes}
      />
    </>
  );
}

const styles = {
  box: {
    sx: {
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center'
    }
  },
  grid: {
    sx: {
      display: 'flex',
      alignItems: 'center'
    }
  }
}