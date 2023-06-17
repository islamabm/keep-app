import React from 'react'
import { getKeepSvg } from '../services/SVG.service'
const ColorPicker = ({ onSelectColor }) => {
  const colors = [
    '#f28b82',
    '#fbbc04',
    '#fff475',
    '#ccff90',
    '#a7ffeb',
    '#cbf0f8',
    '#aecbfa',
    '#d7aefb',
    '#e6c9a8',
  ]

  return (
    <div className="color-picker-overlay">
      <div className="color-picker">
        {colors.map((color, index) => (
          <div
            className="color"
            key={index}
            style={{ backgroundColor: color }}
            onClick={() => onSelectColor(color)}
          ></div>
        ))}
        <i onClick={() => onSelectColor('white')} className="no-color-icon">
          <span
            dangerouslySetInnerHTML={{
              __html: getKeepSvg('noColor'),
            }}
          ></span>
        </i>
      </div>
    </div>
  )
}

export default ColorPicker
