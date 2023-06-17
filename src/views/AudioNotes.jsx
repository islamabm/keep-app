import { useEffect } from 'react'
import { NoteList } from '../cmps/NoteList'
import { useDispatch, useSelector } from 'react-redux'
import { _loadAudioNotes } from '../store/actions/note.actions'

export function AudioNotes(props) {
  const audioNotes = useSelector(
    (storeState) => storeState.noteModule.audioNotes
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(_loadAudioNotes('NoteAudio'))
  }, [])

  if (!audioNotes) return <div className="app-loader"></div>

  return (
    <section className="note-index">
      <NoteList notes={audioNotes} />
    </section>
  )
}
