'use client'

import { useEffect, useState } from "react";

type Note = {
  id: string
  title: string
  content: string
  createdTime: string
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([])


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
  );
}
