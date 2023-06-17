import { useEffect } from 'react'
import { NoteList } from '../cmps/NoteList'
import { useDispatch, useSelector } from 'react-redux'
import { _loadVideoNotes } from '../store/actions/note.actions'

export function VideoNotes(props) {
  const videoNotes = useSelector(
    (storeState) => storeState.noteModule.videoNotes
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(_loadVideoNotes('NoteVideo'))
  }, [])

  if (!videoNotes) return <div class="app-loader"></div>

  return (
    <section className="note-index">
      <NoteList notes={videoNotes} />
    </section>
  )
}
