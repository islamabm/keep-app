import React from 'react'

const EraiserWidthPicker = ({ onWidthSelect }) => {
  const handleWidthClick = (width) => {
    if (onWidthSelect) {
      onWidthSelect(width)
    }
  }

  return (
    <div className="line-size">
      <div onClick={() => handleWidthClick(60)} className="one"></div>
      <div onClick={() => handleWidthClick(30)} className="two"></div>
      <div onClick={() => handleWidthClick(25)} className="three"></div>
      <div onClick={() => handleWidthClick(15)} className="four"></div>
      <div onClick={() => handleWidthClick(13)} className="five"></div>
      <div onClick={() => handleWidthClick(11)} className="six"></div>
      <div onClick={() => handleWidthClick(8)} className="seven"></div>
      <div onClick={() => handleWidthClick(5)} className="eight"></div>
    </div>
  )
}

export default EraiserWidthPicker
