import { useState, useEffect } from 'react'
import { useOnDraw } from '../customHooks/Hooks'
import { getKeepSvg } from '../services/SVG.service'
import { useParams } from 'react-router-dom'
import CanvasColorPicker from '../cmps/CanvasColorPicker'
import EraiserWidthPicker from '../cmps/EraiserWidthPicker'
import { useNavigate } from 'react-router-dom'

import CanvasImagePicker from '../cmps/CanvasImagePicker'
import { useDispatch } from 'react-redux'
import { addImageNote } from '../store/actions/note.actions'
const Canvas = () => {
  const [color, setColor] = useState(false)
  const [image, setImage] = useState(false)
  const [eraiser, setEraiser] = useState(false)
  const [isErasing, setIsErasing] = useState(false)
  const [lineWidth, setLineWidth] = useState(1)
  const [strokeColor, setStrokeColor] = useState('#000000')
  const [width, setWidth] = useState(5)

  const { imgUrl } = useParams()
  const [bgImage, setBgImage] = useState(imgUrl)
  const { setCanvasRef, onCanvasMouseDown, canvasRef } = useOnDraw(
    onDraw,
    isErasing,
    lineWidth
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (canvasRef.current && bgImage) {
      const ctx = canvasRef.current.getContext('2d')
      const img = new Image()

      img.onload = function () {
        ctx.drawImage(
          img,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        )
      }

      img.src = bgImage
    }
  }, [bgImage])

  function onDraw(ctx, point, prevPoint) {
    drawLine(prevPoint, point, ctx, strokeColor, width)
  }
  const handleColorSelect = (color) => {
    setStrokeColor(color)
    setColor(false)
  }
  const handleWidthSelect = (width) => {
    setWidth(width)
    setColor(false)
  }

  const handleEraiserSelect = (width) => {
    setWidth(width)
    setEraiser(false)
  }

  const handleImageSelect = (imgSrc) => {
    setBgImage(imgSrc)
    setImage(false)
  }

  function showColor() {
    setColor(!color)
  }
  function showImage() {
    setImage(!image)
  }

  function handelEraiser() {
    setEraiser(!isErasing)
    setIsErasing(!isErasing)
  }

  function handleAddNote() {
    if (!canvasRef.current) {
      return
    }
    const canvas = canvasRef.current
    const dataUrl = canvas.toDataURL('image/png')

    dispatch(addImageNote(dataUrl))
    navigate('/notes')
  }

  function drawLine(start, end, ctx, color, width) {
    start = start ?? end
    ctx.beginPath()
    ctx.lineWidth = width
    ctx.strokeStyle = color
    ctx.moveTo(start.x, start.y)
    ctx.lineTo(end.x, end.y)
    ctx.stroke()

    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI)
    ctx.fill()
  }

  return (
    <section className="canvas-page-container">
      <section className="canvas-header">
        <div className="first-section">
          <i>
            <span
              dangerouslySetInnerHTML={{
                __html: getKeepSvg('dots'),
              }}
            ></span>
          </i>
          <i>
            <span
              dangerouslySetInnerHTML={{
                __html: getKeepSvg('leftArrow'),
              }}
            ></span>
          </i>
          <i>
            <span
              dangerouslySetInnerHTML={{
                __html: getKeepSvg('rightArrow'),
              }}
            ></span>
          </i>
        </div>
        <div className="second-section">
          <i>
            <span
              onClick={showImage}
              dangerouslySetInnerHTML={{
                __html: getKeepSvg('backgroundImage'),
              }}
            ></span>
          </i>
          <i>
            <span
              onClick={showColor}
              dangerouslySetInnerHTML={{
                __html: getKeepSvg('pencil'),
              }}
            ></span>
          </i>
          <i>
            <span
              onClick={handelEraiser}
              dangerouslySetInnerHTML={{
                __html: getKeepSvg('clear'),
              }}
            ></span>
          </i>
          <button onClick={handleAddNote}>Add note</button>
        </div>

        {eraiser && <EraiserWidthPicker onWidthSelect={handleEraiserSelect} />}

        {color && (
          <CanvasColorPicker
            onColorSelect={handleColorSelect}
            onWidthSelect={handleWidthSelect}
          />
        )}
        {/* {image && <CanvasImagePicker onImageSelect={handleImageSelect} />} */}
      </section>
      <section
        className="canvas-container"
        style={{ width: '100%', height: '100%' }}
      >
        <canvas
          className="canvas-page"
          style={{ width: '100%', height: '100%' }}
          onMouseDown={onCanvasMouseDown}
          ref={setCanvasRef}
        />
      </section>
    </section>
  )
}

export default Canvas
