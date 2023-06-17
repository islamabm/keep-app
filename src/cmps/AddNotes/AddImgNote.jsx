import React, { useCallback, useEffect, useRef } from 'react'
import { uploadImg } from '../../services/upload.service'

export function AddImgNote({ updateInfo }) {
  const fileInput = useRef(null)

  const handleUpload = useCallback(
    async (e) => {
      const res = await uploadImg(e.target.files[0])
      updateInfo('imgUrl', res.url)
    },
    [updateInfo]
  )

  useEffect(() => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }, [])

  return (
    <div>
      <input
        type="file"
        onChange={handleUpload}
        ref={fileInput}
        style={{ display: 'none' }}
      />
    </div>
  )
}
