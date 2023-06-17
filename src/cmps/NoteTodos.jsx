import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useState, useRef } from 'react'
import { makeId } from '../services/util.service'
import { useDispatch } from 'react-redux'
import { updateTodoOrder, updateTodosText } from '../store/actions/note.actions'

export function NoteTodos({
  info,
  onRemoveTodo,
  onToggleTodoDone,
  noteId,
  setIsEditingForNote,
}) {
  const [todos, setTodos] = useState(info.todos)
  const [todosInProgress, setTodosInProgress] = useState([''])

  const [isEditing, setIsEditing] = useState(false)

  const dispatch = useDispatch()

  const isDragging = useRef(false)

  const handleOnDragStart = () => {
    isDragging.current = true
  }

  const handleOnDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(todos)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setTodos(items)
    dispatch(updateTodoOrder(noteId, items))
    isDragging.current = false
  }

  const handleTodoClick = (e) => {
    e.stopPropagation()
    if (!isDragging.current) {
      setIsEditing(true)
      setIsEditingForNote(noteId, true)
    }
  }

  const handleTodoInputChange = (index, e) => {
    e.stopPropagation()
    const updatedTodos = [...todos]
    updatedTodos[index].txt = e.target.value
    setTodos(updatedTodos)
  }
  const handleAddTodo = (index, e) => {
    e.stopPropagation()

    const updatedTodosInProgress = [...todosInProgress]
    updatedTodosInProgress[index] = e.target.value
    if (index === updatedTodosInProgress.length - 1) {
      updatedTodosInProgress.push('')
    }
    setTodosInProgress(updatedTodosInProgress)
  }

  const saveTodosChanges = (event) => {
    event.stopPropagation()

    const newTodos = todosInProgress
      .filter((todo) => todo.trim() !== '')
      .map((todo) => ({
        _id: makeId(),
        txt: todo,
        isDone: false,
      }))
    console.log('newTodos', newTodos)
    setTodos(todos.concat(newTodos))
    dispatch(updateTodosText(noteId, todos.concat(newTodos)))
    setTodosInProgress([''])
    setIsEditing(false)
    setIsEditingForNote(noteId, false)
  }

  return (
    <DragDropContext
      onDragEnd={handleOnDragEnd}
      onDragStart={handleOnDragStart}
    >
      <Droppable droppableId="notes">
        {(provided) => (
          <div
            className="note-todos-preview"
            {...provided.droppableProps}
            ref={provided.innerRef}
            onClick={handleTodoClick}
          >
            {todos.map((todo, index) => (
              <Draggable key={todo._id} draggableId={todo._id} index={index}>
                {(provided) => (
                  <div
                    className="todo-preview"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div className="todo">
                      <button onClick={(e) => onRemoveTodo(todo._id, e)}>
                        X
                      </button>

                      {isEditing ? (
                        <input
                          className="edit-txt-note-input"
                          value={todo.txt}
                          onChange={(e) => {
                            handleTodoInputChange(index, e)
                          }}
                          autoFocus
                        />
                      ) : (
                        <p>{todo.txt}</p>
                      )}
                    </div>

                    <input
                      type="checkbox"
                      checked={todo.isDone}
                      onChange={(e) => {
                        e.stopPropagation()
                        onToggleTodoDone(todo._id)
                      }}
                      onClick={(e) => e.stopPropagation()}
                    ></input>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}

            {isEditing && (
              <>
                <button className="save-note-todo" onClick={saveTodosChanges}>
                  Save
                </button>
                <div className="dynamic-inputs">
                  {todosInProgress.map((todoInProgress, index) => (
                    <input
                      key={index}
                      className="add-todo-input"
                      type="text"
                      value={todoInProgress}
                      onChange={(e) => handleAddTodo(index, e)}
                      placeholder="+ Add todo"
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
