import React, { useState } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { Audio } from 'react-loader-spinner'

const containerStyle = {
  width: '250px',
  height: '250px',
}
const options = {
  zoomControlOptions: {
    position: 9,
  },
}

export function NoteMap({ info }) {
  const [center, setCenter] = useState({
    lat: info.lat,
    lng: info.lng,
  })

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS,
  })

  if (loadError) {
    return <div>Error loading Google Maps</div>
  }

  if (!isLoaded)
    return (
      <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
    )
  return (
    <div className="google-maps">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={info.zoom}
        options={options}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  )
}
