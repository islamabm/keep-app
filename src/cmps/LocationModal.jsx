import React, { useState } from 'react'
import { getKeepSvg } from '../services/SVG.service'
const LocationModal = ({ onAllow }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [isClicked, setIsClicked] = useState(false)

  const handleButtonClick = () => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 500)
    handleAllow()
  }

  const handleAllow = async () => {
    try {
      const position = await onAllow()

      setIsOpen(false)
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  return isOpen ? (
    <div className="location-modal">
      <div className="location-modal-content">
        <h2>Allow Location Access</h2>
        <p>We need to know your location for better service.</p>
        <button
          // className={`location-btn like ${isClicked ? 'animate' : ''}`}
          onClick={handleButtonClick}
        >
          <span
            dangerouslySetInnerHTML={{
              __html: getKeepSvg('like'),
            }}
          ></span>
        </button>
        <button className="location-btn" onClick={() => setIsOpen(false)}>
          <span
            dangerouslySetInnerHTML={{
              __html: getKeepSvg('unLike'),
            }}
          ></span>
        </button>
      </div>
    </div>
  ) : null
}

export default LocationModal
