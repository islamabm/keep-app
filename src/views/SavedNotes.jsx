import { useSelector } from 'react-redux'
import { NoteList } from '../cmps/NoteList'
export function SavedNotes(props) {
  const savedNotes = useSelector(
    (storeState) => storeState.noteModule.savedNotes
  )

  if (!savedNotes) return <div className="app-loader"></div>

  return (
    <section className="note-index">
      <NoteList notes={savedNotes} />
    </section>
  )
}
