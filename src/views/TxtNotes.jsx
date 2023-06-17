import { useEffect } from 'react'
import { NoteList } from '../cmps/NoteList'
import { useDispatch, useSelector } from 'react-redux'
import { _loadTxtNotes } from '../store/actions/note.actions'

export function TxtNotes(props) {
  const txtNotes = useSelector((storeState) => storeState.noteModule.txtNotes)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(_loadTxtNotes('NoteTxt'))
  }, [])

  if (!txtNotes) return <div class="app-loader"></div>

  return (
    <section className="note-index">
      <NoteList notes={txtNotes} />
    </section>
  )
}
