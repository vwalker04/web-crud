'use client'

import { useEffect, useState } from 'react';
import { Note, NOTES_KEY } from '@/app/page';
import { useParams, useRouter } from 'next/navigation';
import Grid from '@mui/material/Grid2'
import { Button, Typography } from '@mui/material';
import EditNotesModal from '@/app/components/EditNotesModal';


export default function NoteDetails() {
    const [note, setNote] = useState<Note | undefined>(undefined)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const { id } = useParams()
    const router = useRouter()

    useEffect(() => {
        const notes = getNotes()
        const note: Note | undefined = notes.find(n => n.id === id)
        if (note) setNote(note)
    }, [])

    const getNotes = (): Note[] => {
        const rawNotes = localStorage.getItem(NOTES_KEY)
        return rawNotes ? JSON.parse(rawNotes) : []
    }

    const handleDelete = () => {
        const notes = getNotes()
        const updateNotes = notes.filter(n => n.id !== note?.id)
        localStorage.setItem(NOTES_KEY, JSON.stringify(updateNotes))
        router.back()
    }

    return (
        <>
            {note &&
                <>
                    <Grid>
                        <Typography variant="h6">Note Details</Typography>
                        <Typography>Note ID: {note.id}</Typography>
                        <Typography>Note title: {note.title}</Typography>
                        <Typography>Content: {note.content}</Typography>
                        <Typography>Creted Timestamp: {note.createdTime}</Typography>
                        <Button onClick={() => setOpenModal(true)}>Edit</Button>
                        <Button onClick={handleDelete}>Delete</Button>
                    </Grid>
                    <EditNotesModal open={openModal} handleClose={() => setOpenModal(false)} note={note} />
                </>
            }
        </>
    );
};
