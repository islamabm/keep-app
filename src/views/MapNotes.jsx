import { useEffect } from 'react'
import { NoteList } from '../cmps/NoteList'
import { useDispatch, useSelector } from 'react-redux'
import { _loadMapNotes } from '../store/actions/note.actions'

export function MapNotes(props) {
  const mapNotes = useSelector((storeState) => storeState.noteModule.mapNotes)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(_loadMapNotes('NoteMap'))
  }, [])

  if (!mapNotes) return <div className="app-loader"></div>

  return (
    <section className="note-index">
      <NoteList notes={mapNotes} />
    </section>
  )
}
