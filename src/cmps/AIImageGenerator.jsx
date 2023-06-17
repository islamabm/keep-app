import React, { useState } from 'react'
import { generateImageFromText } from '../services/ai.service'
import { useDispatch } from 'react-redux'
import { getKeepSvg } from '../services/SVG.service'
import { addImageNote } from '../store/actions/note.actions'

export default function AIImageGenerator({ isOpen, toggleModal }) {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  if (!isOpen) {
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const url = await generateImageFromText(prompt)
      dispatch(addImageNote(url))
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
      toggleModal()
    }
  }

  return (
    <div className="ai-modal-back-drop">
      <div className="ai-modal">
        <button onClick={toggleModal} className="close-ai-modal">
          {' '}
          <span
            dangerouslySetInnerHTML={{
              __html: getKeepSvg('closeModal'),
            }}
          ></span>
        </button>
        <form onSubmit={handleSubmit}>
          <h1>Create AI Image</h1>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter description..."
          />
          <button className="btn-generate" type="submit">
            <span>Create image</span>
          </button>
        </form>
        {loading && <span className="loader"></span>}
      </div>
    </div>
  )
}
