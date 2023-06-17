import React from 'react'

import { AddMap } from '../../store/actions/note.actions'
import { useDispatch } from 'react-redux'
export function AddMapNote({ updateInfo, info, onAddNote, show }) {
  const dispatch = useDispatch()

  function addNote() {
    dispatch(AddMap(updateInfo.lat, updateInfo.lng, updateInfo.zoom))
    if (onAddNote) {
      onAddNote()
    }
  }

  return (
    <>
      {show && (
        <div className="add-map-modal-back-drop">
          <div className="add-map-modal">
            <h1>Add map</h1>
            <input
              type="text"
              value={info.lat || ''}
              onChange={(e) => updateInfo('lat', +e.target.value)}
              placeholder="Enter lat"
            />
            <input
              type="text"
              value={info.lng || ''}
              onChange={(e) => updateInfo('lng', +e.target.value)}
              placeholder="Enter lng"
            />
            <input
              type="text"
              value={info.zoom || ''}
              onChange={(e) => updateInfo('zoom', +e.target.value)}
              placeholder="Enter zoom"
            />
            <button onClick={addNote}>Add note</button>
          </div>
        </div>
      )}
    </>
  )
}
