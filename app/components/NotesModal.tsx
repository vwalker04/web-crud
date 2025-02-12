import { useState } from "react"
import { Note, NOTES_KEY } from "../page"
import { Modal, Box, Typography, TextField, Button } from "@mui/material"
import Grid from '@mui/material/Grid2'
import { v4 as uuidv4 } from 'uuid'

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
        <Grid {...styles.container}>
          <Typography variant="h6">Add New Note</Typography>
          <TextField label="Title" value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
          <TextField label="Content" value={content} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value)} />
          <Button onClick={handleNewNote}>Add Note</Button>
        </Grid>
      </Modal>
    )
  }

  export default NotesModal
  
  const styles = {
    container: {
        sx: {
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            backgroundColor: 'white',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
        }
    }
}