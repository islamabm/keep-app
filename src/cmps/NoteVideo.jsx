import React, { useState } from 'react'
import UrlModal from './UrlModal'
export function NoteVideo({ info, onChangeVideoUrl }) {
  const [showUrlModal, setShowUrlModal] = useState(false)

  function openModal() {
    setShowUrlModal(true)
  }

  const handleNewUrl = (newUrl) => {
    if (newUrl) {
      onChangeVideoUrl(newUrl)
    }
    setShowUrlModal(false)
  }
  return (
    <div onClick={openModal} className="note-video-preview">
      <video autoPlay loop muted controls>
        <source src={info.url} type="video/mp4"></source>
      </video>
      {showUrlModal && (
        <UrlModal
          onChangeUrl={handleNewUrl}
          onCloseUrlModal={() => setShowUrlModal(false)}
        />
      )}
    </div>
  )
}
