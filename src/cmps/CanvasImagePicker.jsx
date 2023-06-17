import React from 'react'

const CanvasImagePicker = ({ onImageSelect }) => {
  const images = [
    'https://publications.lexmark.com/media/library/LEXMARK/Blank%20Page.jpg',
    'https://img.freepik.com/premium-vector/squared-paper-texture-notebook-page-cage_159025-44.jpg',
    'https://img.freepik.com/premium-vector/dotted-grid-seamless-pattern-bullet-journal-black-point-texture-blue-dot-grid-notebook-paper-vector-illustration-white-background_192280-937.jpg?w=2000',
    'https://img.freepik.com/premium-vector/standard-school-notebook-line-vector-background_231786-8844.jpg',
  ]

  const handleImageClick = (imgSrc) => {
    if (onImageSelect) {
      onImageSelect(imgSrc)
    }
  }

  return (
    <div className="image-picker-canvas-overlay">
      <div className="image-canvas-picker">
        {images.map((image, index) => (
          <img
            className="image-canvas"
            key={index}
            src={image}
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>
    </div>
  )
}

export default CanvasImagePicker
