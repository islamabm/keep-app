import ColorPicker from './ColorPicker'
import ImagePicker from './ImagePicker'
export function Picker({ onSelectColor, onSelectImage }) {
  return (
    <div className="picker-container">
      <ColorPicker onSelectColor={onSelectColor} />
      <ImagePicker onSelectImage={onSelectImage} />
    </div>
  )
}
