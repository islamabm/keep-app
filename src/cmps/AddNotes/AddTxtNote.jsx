import React from 'react'

export function AddTxtNote({ updateInfo, info }) {
  return (
    <input
      className="add-note-input"
      type="text"
      value={info.txt || ''}
      onChange={(e) => updateInfo('txt', e.target.value)}
      placeholder="Enter text..."
    />
  )
}
