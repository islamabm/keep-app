import React, { useState } from 'react'

export default function UrlModal({ onChangeUrl, onCloseUrlModal }) {
  const [url, setUrl] = useState('')

  const handleChange = (e) => {
    setUrl(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onChangeUrl(url)
  }

  return (
    <div className="edit-modal-back-drop">
      <div className="edit-modal">
        <button
          className="close-url-modal"
          onClick={(e) => {
            e.stopPropagation()
            onCloseUrlModal()
          }}
        >
          X
        </button>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={url}
            onChange={handleChange}
            placeholder="Enter new url"
          />
          <button type="submit">Change URL</button>
        </form>
      </div>
    </div>
  )
}
