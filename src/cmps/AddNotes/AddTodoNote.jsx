import React from 'react'

export function AddTodoNote({ updateInfo, info }) {
  const handleChange = (e) => {
    const todos = e.target.value
      .split(',')
      .map((txt) => ({ txt: txt.trim(), isDone: false }))
    updateInfo('todos', todos)
  }

  let initialValue = ''
  if (info.todos) {
    initialValue = info.todos.map((todo) => todo.txt).join(', ')
  }

  return (
    <input
      className="add-note-input"
      type="text"
      value={initialValue}
      onChange={handleChange}
      placeholder="Enter todos, separated by commas..."
    />
  )
}
