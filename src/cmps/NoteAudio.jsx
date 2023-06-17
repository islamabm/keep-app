import React, { useState } from 'react'
import UrlModal from './UrlModal'

export function NoteAudio({ info, onChangeUrl }) {
  const [showUrlModal, setShowUrlModal] = useState(false)

  function openModal() {
    setShowUrlModal(true)
  }

  const handleNewUrl = (newUrl) => {
    if (newUrl) {
      onChangeUrl(newUrl)
    }
    setShowUrlModal(false)
  }
  return (
    <section>
      <div onClick={openModal} className="note-audio-preview">
        <audio className="audio-display" controls>
          <source src={info.url} type="audio/ogg"></source>
        </audio>
      </div>
      {showUrlModal && (
        <UrlModal
          onChangeUrl={handleNewUrl}
          onCloseUrlModal={() => setShowUrlModal(false)}
        />
      )}
    </section>
  )
}
