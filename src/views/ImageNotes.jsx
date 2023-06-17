import { Component, useCallback, useEffect, useMemo, useState } from 'react'
import { NoteList } from '../cmps/NoteList'
import { connect, useDispatch, useSelector } from 'react-redux'
import { _loadImageNotes } from '../store/actions/note.actions'

export function ImageNotes(props) {
  const imageNotes = useSelector(
    (storeState) => storeState.noteModule.imageNotes
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(_loadImageNotes('NoteImg'))
  }, [])

  if (!imageNotes) return <div className="app-loader"></div>

  return (
    <section className="note-index">
      <NoteList notes={imageNotes} />
    </section>
  )
}
