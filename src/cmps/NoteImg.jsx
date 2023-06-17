import React, { useCallback } from 'react'
import { uploadImg } from '../services/upload.service'

export function NoteImg({ info, onChangeUrl }) {
  const handleUpload = useCallback(async (e) => {
    const res = await uploadImg(e.target.files[0])
    onChangeUrl(res.url)
    console.log('res.url', res.url)
  }, [])

  return (
    <div
      className="note-img-preview"
      onClick={() => document.getElementById('hiddenFileInput').click()}
    >
      <img src={info.url} alt={info.title} />
      <input
        id="hiddenFileInput"
        type="file"
        onChange={handleUpload}
        style={{ display: 'none' }}
      />
    </div>
  )
}
