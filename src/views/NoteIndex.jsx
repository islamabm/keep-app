import { useCallback, useEffect, useState } from 'react'
import { NoteList } from '../cmps/NoteList'
import { useDispatch, useSelector } from 'react-redux'
import { eventBus } from '../services/event-bus.service'
import { AddNote } from '../cmps/AddNote'
import AIImageGenerator from '../cmps/AIImageGenerator'
import {
  _loadNotes,
  removeNote,
  addNoteToRemoveNotes,
  saveNote,
} from '../store/actions/note.actions'

export function NoteIndex(props) {
  const notes = useSelector((storeState) => storeState.noteModule.notes)

  const dispatch = useDispatch()
  const [modalOpen, setModalOpen] = useState(false)
  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }

  useEffect(() => {
    const removeEventListener = eventBus.on('open-modal', toggleModal)

    return () => {
      removeEventListener()
    }
  }, [toggleModal])

  useEffect(() => {
    dispatch(_loadNotes())
  }, [])

  const onRemoveNote = useCallback(async (noteId) => {
    try {
      dispatch(addNoteToRemoveNotes(noteId))
      dispatch(removeNote(noteId))
    } catch (error) {
      console.log('error:', error)
    }
  }, [])
  const onSaveNote = useCallback(async (noteId) => {
    try {
      dispatch(saveNote(noteId))
      dispatch(removeNote(noteId))
    } catch (error) {
      console.log('error:', error)
    }
  }, [])

  if (!notes) return <div className="app-loader"></div>

  return (
    <section className="main-app">
      <section className="container">
        <section className="note-index">
          <AIImageGenerator isOpen={modalOpen} toggleModal={toggleModal} />
          <AddNote />
          <NoteList
            notes={notes}
            onRemoveNote={onRemoveNote}
            onSaveNote={onSaveNote}
          />
        </section>
      </section>
    </section>
  )
}
