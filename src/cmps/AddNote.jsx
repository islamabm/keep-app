import React, { useState, useEffect } from 'react'
import { AddTxtNote } from './AddNotes/AddTxtNote'
import { AddMapNote } from './AddNotes/AddMapNote'
import { AddTodoNote } from './AddNotes/AddTodoNote'
import { AddImgNote } from './AddNotes/AddImgNote'
import { AddAudioNote } from './AddNotes/AddAudioNote'
import { getKeepSvg } from '../services/SVG.service'
import { useNavigate } from 'react-router-dom'
import { AddVideoNote } from './AddNotes/AddVideoNote'
import Transcript from './Transcript'
import { useDispatch } from 'react-redux'
import {
  addTxtNote,
  addTodoNote,
  AddMap,
  addVideoNote,
  addAudioNote,
  addImageNote,
} from '../store/actions/note.actions'

export function AddNote() {
  const [selectedNote, setSelectedNote] = useState('NoteTxt')
  const [noteInfo, setNoteInfo] = useState({})
  const [showForm, setShowForm] = useState(false)
  const [navigateToCanvas, setNavigateToCanvas] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [modalVisible, setModalVisible] = useState(false)

  const updateInfo = (key, value) => {
    setNoteInfo((prevInfo) => ({
      ...prevInfo,
      [key]: value,
    }))
  }
  useEffect(() => {
    if (navigateToCanvas) {
      navigate('/canvas')
    }
  }, [navigateToCanvas, navigate])

  useEffect(() => {}, [selectedNote, modalVisible])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showForm &&
        !event.target.closest('.add-note-form') &&
        !event.target.closest('.display-btns')
      ) {
        setShowForm(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showForm])

  const closeModal = () => {
    setModalVisible(false)
  }

  function showModalMap() {
    setShowForm(true)
    setSelectedNote('NoteMap')
    setModalVisible(true)
  }

  function showFormNote() {
    setShowForm(true)
  }

  const saveNote = (e) => {
    e.preventDefault()
    setShowForm(false)
    switch (selectedNote) {
      case 'NoteTxt':
        dispatch(addTxtNote(noteInfo.txt))
        break
      case 'NoteTodos':
        dispatch(addTodoNote(noteInfo.todos))
        break
      case 'NoteMap':
        dispatch(AddMap(noteInfo.lat, noteInfo.lng, noteInfo.zoom))
        break
      case 'NoteImg':
        dispatch(addImageNote(noteInfo.imgUrl))
        break
      case 'NoteAudio':
        dispatch(addAudioNote(noteInfo.url))
        break
      case 'NoteVideo':
        dispatch(addVideoNote(noteInfo.url))
        break
      default:
    }
  }

  let NoteComponent
  switch (selectedNote) {
    case 'NoteTxt':
      NoteComponent = AddTxtNote
      break
    case 'NoteMap':
      NoteComponent = AddMapNote
      break
    case 'NoteTodos':
      NoteComponent = AddTodoNote
      break
    case 'NoteImg':
      console.log('image')
      NoteComponent = AddImgNote
      break
    case 'NoteAudio':
      NoteComponent = AddAudioNote
      break
    case 'NoteVideo':
      NoteComponent = AddVideoNote
      break
    default:
      NoteComponent = AddTxtNote
  }

  return (
    <div className="user-input-container">
      {showForm ? (
        <form className="add-note-form" onSubmit={saveNote}>
          <NoteComponent
            updateInfo={updateInfo}
            info={noteInfo}
            onAddNote={closeModal}
            show={modalVisible}
          />
          <button className="save-note-btn">Save</button>
        </form>
      ) : (
        <section className="display-btns">
          <i
            title="txt"
            onClick={() => {
              setSelectedNote('NoteTxt')
              showFormNote()
            }}
          >
            <span
              className="user-icon"
              dangerouslySetInnerHTML={{
                __html: getKeepSvg('text'),
              }}
            ></span>
          </i>
          <i
            title="todos"
            onClick={() => {
              setSelectedNote('NoteTodos')
              showFormNote()
            }}
          >
            <span
              className="user-icon"
              dangerouslySetInnerHTML={{
                __html: getKeepSvg('list'),
              }}
            ></span>
          </i>
          <i
            title="audio"
            onClick={() => {
              setSelectedNote('NoteAudio')
              showFormNote()
            }}
          >
            <span
              className="user-icon"
              dangerouslySetInnerHTML={{
                __html: getKeepSvg('audio'),
              }}
            ></span>
          </i>
          <i
            title="image"
            onClick={() => {
              setSelectedNote('NoteImg')
              showFormNote()
            }}
          >
            <span
              className="user-icon"
              dangerouslySetInnerHTML={{
                __html: getKeepSvg('image'),
              }}
            ></span>
          </i>
          <i
            title="video"
            onClick={() => {
              setSelectedNote('NoteVideo')
              showFormNote()
            }}
          >
            <span
              className="user-icon"
              dangerouslySetInnerHTML={{
                __html: getKeepSvg('video'),
              }}
            ></span>
          </i>
          <Transcript />
          <i title="map" onClick={showModalMap}>
            <span
              className="user-icon"
              dangerouslySetInnerHTML={{
                __html: getKeepSvg('map'),
              }}
            ></span>
          </i>
          <i title="draw" onClick={() => setNavigateToCanvas(true)}>
            <span
              className="user-icon"
              dangerouslySetInnerHTML={{
                __html: getKeepSvg('draw'),
              }}
            ></span>
          </i>
        </section>
      )}
    </div>
  )
}
