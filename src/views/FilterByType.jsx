import { getKeepSvg } from '../services/SVG.service'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export function FilterByType(props) {
  const navigate = useNavigate()
  const [route, setRoute] = useState('')

  useEffect(() => {
    if (route !== '') {
      navigate(`/search/${route}`)
    }
  }, [route])

  function handleOnClick(type) {
    return function () {
      setRoute(type)
    }
  }

  return (
    <section className="notes-type-container">
      <div className="search-container">
        <h1>Types</h1>
        <div className="types">
          <div onClick={handleOnClick('image')}>
            <i>
              {' '}
              <span
                className="user-icon"
                dangerouslySetInnerHTML={{
                  __html: getKeepSvg('image'),
                }}
              ></span>
            </i>
            <p>Images</p>
          </div>
          <div onClick={handleOnClick('video')}>
            <i>
              <span
                className="user-icon"
                dangerouslySetInnerHTML={{
                  __html: getKeepSvg('video'),
                }}
              ></span>
            </i>
            <p>Videos</p>
          </div>
          <div onClick={handleOnClick('todo')}>
            <i>
              <span
                className="user-icon"
                dangerouslySetInnerHTML={{
                  __html: getKeepSvg('list'),
                }}
              ></span>
            </i>
            <p>Lists</p>
          </div>
          <div onClick={handleOnClick('txt')}>
            <i>
              <span
                className="user-icon"
                dangerouslySetInnerHTML={{
                  __html: getKeepSvg('edit'),
                }}
              ></span>
            </i>
            <p>Text</p>
          </div>
          <div onClick={handleOnClick('map')}>
            <i>
              <span
                className="user-icon"
                dangerouslySetInnerHTML={{
                  __html: getKeepSvg('map'),
                }}
              ></span>
            </i>
            <p>Maps</p>
          </div>
          <div onClick={handleOnClick('audio')}>
            <i>
              <span
                className="user-icon"
                dangerouslySetInnerHTML={{
                  __html: getKeepSvg('audio'),
                }}
              ></span>
            </i>
            <p>Audio</p>
          </div>
        </div>
      </div>
    </section>
  )
}
