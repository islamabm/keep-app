import { memo, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'

import { ShareModal } from './ShareModal'
import { useDispatch } from 'react-redux'
import { updateNote } from '../store/actions/note.actions'
import {
  changeNoteColor,
  changeNoteImage,
  duplicateNote,
  pinNote,
  removeTodo,
  toggleTodoDone,
} from '../store/actions/note.actions'
import { Picker } from './Picker'
import { NoteTxt } from './NoteTxt'
import { NoteVideo } from './NoteVideo'
import { NoteImg } from './NoteImg'
import { NoteAudio } from './NoteAudio'
import { NoteTodos } from './NoteTodos'
import { NoteMap } from './NoteMap'
import { getKeepSvg } from '../services/SVG.service'
const noteComponents = {
  NoteTxt: NoteTxt,
  NoteVideo: NoteVideo,
  NoteImg: NoteImg,
  NoteAudio: NoteAudio,
  NoteTodos: NoteTodos,
  NoteMap: NoteMap,
}

function _NoteList({
  notes: notes,
  onRemoveNote,
  onSaveNote,
  onChangeNoteColor,
  onChangeNoteImage,
  onDuplicateNote,
  onPinNote,
  onRemoveTodo,
  onToggleTodoDone,
}) {
  const [isColorPickerVisible, setColorPickerVisibility] = useState(false)
  const [selectedNoteId, setSelectedNoteId] = useState(null)
  const [editingNotes, setEditingNotes] = useState({})
  const [showShareModal, setShowShareModal] = useState(false)
  const [currentNote, setCurrentNote] = useState(null)
  const dispatch = useDispatch()
  const params = useParams()
  const location = useLocation()
  const toggleColorPicker = (event, noteId) => {
    event.stopPropagation()
    setSelectedNoteId(noteId)
    setColorPickerVisibility(!isColorPickerVisible)
  }

  const handleShare = (note) => {
    setCurrentNote(note)
    setShowShareModal(true)
  }

  const setIsEditingForNote = (noteId, isEditing) => {
    setEditingNotes({
      ...editingNotes,
      [noteId]: isEditing,
    })
  }

  const updateImageUrl = (newUrl, noteId) => {
    dispatch(updateNote(newUrl, noteId))
  }
  const updateVideoUrl = (newUrl, noteId) => {
    dispatch(updateNote(newUrl, noteId))
  }

  const handleSelectColor = (color) => {
    onChangeNoteColor(color, selectedNoteId)
    setColorPickerVisibility(false)
  }
  const handleSelectImage = (image) => {
    onChangeNoteImage(image, selectedNoteId)
    setColorPickerVisibility(false)
  }

  const handleRemoveTodo = (todoId, noteId, e) => {
    e.stopPropagation()
    dispatch(removeTodo(todoId, noteId))
    // onRemoveTodo(todoId, noteId)
  }

  const handleToggleTodoDone = (todoId, noteId) => {
    onToggleTodoDone(todoId, noteId)
  }

  const pinnedNotes = notes.filter((note) => note.isPinned)
  const unpinnedNotes = notes.filter((note) => !note.isPinned)
  const renderNote = (note) => {
    const NoteComponent = noteComponents[note.type]
    if (!NoteComponent) {
      console.error(`No component found for note type "${note.type}"`)
      return null
    }
    return (
      <div
        className="note-container"
        key={note._id}
        style={{
          backgroundColor: note.style.backgroundColor,
          backgroundImage: note.style.backgroundImage
            ? `url(${note.style.backgroundImage})`
            : null,
        }}
      >
        <NoteComponent
          info={note.info}
          onRemoveTodo={(todoId, e) => handleRemoveTodo(todoId, note._id, e)}
          onToggleTodoDone={(todoId) => handleToggleTodoDone(todoId, note._id)}
          noteId={note._id}
          onChangeUrl={(newUrl) => updateImageUrl(newUrl, note._id)}
          onChangeVideoUrl={(newUrl) => updateVideoUrl(newUrl, note._id)}
          setIsEditingForNote={setIsEditingForNote}
        />
        <div className="note-actions-container">
          <i onClick={() => onRemoveNote(note._id)}>
            <span
              title="Delete note"
              dangerouslySetInnerHTML={{
                __html: getKeepSvg('deleteNote'),
              }}
            ></span>
          </i>
          <i onClick={() => onPinNote(note._id)} className="pin-icon">
            <span
              title="Pin note"
              dangerouslySetInnerHTML={{
                __html: getKeepSvg('pin'),
              }}
            ></span>
          </i>
          <i onClick={(event) => toggleColorPicker(event, note._id)}>
            <span
              title="background color"
              dangerouslySetInnerHTML={{
                __html: getKeepSvg('color'),
              }}
            ></span>
          </i>
          <i onClick={() => onSaveNote(note._id)}>
            <span
              title="Transfer to archive"
              dangerouslySetInnerHTML={{
                __html: getKeepSvg('saveNote'),
              }}
            ></span>
          </i>
          <i onClick={() => handleShare(note)}>
            <span
              title="Share note"
              dangerouslySetInnerHTML={{
                __html: getKeepSvg('share'),
              }}
            ></span>
          </i>
          <i onClick={() => onDuplicateNote(note._id)}>
            <span
              title="Duplicated note"
              dangerouslySetInnerHTML={{
                __html: getKeepSvg('duplicate'),
              }}
            ></span>
          </i>
          {isColorPickerVisible && selectedNoteId === note._id && (
            <Picker
              onSelectColor={handleSelectColor}
              onSelectImage={handleSelectImage}
            />
          )}
        </div>
      </div>
    )
  }
  return (
    <>
      {showShareModal && (
        <ShareModal
          note={currentNote}
          onClose={() => setShowShareModal(false)}
          link={params}
        />
      )}
      {pinnedNotes.length > 0 && <p>Pinned notes</p>}
      <section className="pinned-notes-section simple-cards-grid">
        {pinnedNotes.map((note) => renderNote(note))}
      </section>

      <p>Another notes</p>
      <section className="simple-cards-grid">
        {unpinnedNotes.map((note) => renderNote(note))}
      </section>
    </>
  )
}

const mapDispatchToProps = {
  onChangeNoteColor: changeNoteColor,
  onChangeNoteImage: changeNoteImage,
  onDuplicateNote: duplicateNote,
  onPinNote: pinNote,
  onRemoveTodo: removeTodo,
  onToggleTodoDone: toggleTodoDone,
}

export const NoteList = connect(null, mapDispatchToProps)(memo(_NoteList))
