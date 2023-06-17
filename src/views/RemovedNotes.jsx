import { useSelector } from 'react-redux'
import { NoteList } from '../cmps/NoteList'
export function RemovedNotes(props) {
  const removedNotes = useSelector(
    (storeState) => storeState.noteModule.removedNotes
  )

  if (!removedNotes) return <div className="app-loader"></div>

  return (
    <section className="note-index">
      <NoteList notes={removedNotes} />
    </section>
  )
}
