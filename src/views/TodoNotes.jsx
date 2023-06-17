import { useEffect } from 'react'
import { NoteList } from '../cmps/NoteList'
import { useDispatch, useSelector } from 'react-redux'
import { _loadTodosNotes } from '../store/actions/note.actions'

export function TodoNotes(props) {
  const todosNotes = useSelector(
    (storeState) => storeState.noteModule.todoNotes
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(_loadTodosNotes('NoteTodos'))
  }, [])

  if (!todosNotes) return <div className="app-loader"></div>

  return (
    <section className="note-index">
      <NoteList notes={todosNotes} />
    </section>
  )
}
