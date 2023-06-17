import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { updateTextNote } from '../store/actions/note.actions'
export function NoteTxt({ info, onUpdateNote, noteId, setIsEditingForNote }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(info.txt)

  const dispatch = useDispatch()

  function handleNoteClick() {
    setIsEditing(true)
    setIsEditingForNote(noteId, true)
  }

  function handleInputChange(e) {
    setEditText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateTextNote(editText, noteId))
    setIsEditing(false)
    setIsEditingForNote(noteId, false)
  }

  return (
    <div className="note-txt-preview" onClick={handleNoteClick}>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            className="edit-txt-note-input"
            value={editText}
            onChange={handleInputChange}
            autoFocus
          />
          <button className="save-note-txt" type="submit">
            save
          </button>
        </form>
      ) : (
        info.txt
      )}
    </div>
  )
}
