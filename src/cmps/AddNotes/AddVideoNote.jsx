import React from 'react'

export function AddVideoNote({ updateInfo, info }) {
  return (
    <input
      className="add-note-input"
      type="url"
      value={info.url || ''}
      onChange={(e) => updateInfo('url', e.target.value)}
      placeholder="Enter video url..."
    />
  )
}
