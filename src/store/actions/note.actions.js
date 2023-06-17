import { noteService } from '../../services/note.service'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import {
  REMOVE_NOTE,
  SET_FILTER_BY,
  SET_NOTES,
  UPDATE_NOTE,
  DUPLICATE_NOTE,
  ADD_NOTE_TO_REMOVED_NOTE,
  SAVE_NOTE,
  SET_AUDIO_NOTES,
  SET_IMAGE_NOTES,
  SET_TODO_NOTES,
  SET_TXT_NOTES,
  SET_VIDEO_NOTES,
  SET_MAP_NOTES,
  ADD_NOTE,
} from '../reducers/note.reducer'

export function _loadNotes() {
  return async (dispatch, getState) => {
    try {
      const notes = await noteService.query()
      const action = {
        type: SET_NOTES,
        notes,
      }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}
export function _loadImageNotes(type) {
  return async (dispatch, getState) => {
    try {
      const notes = await noteService.getNotesByType(type)
      const action = {
        type: SET_IMAGE_NOTES,
        notes,
      }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}
export function _loadVideoNotes(type) {
  return async (dispatch, getState) => {
    try {
      const notes = await noteService.getNotesByType(type)

      const action = {
        type: SET_VIDEO_NOTES,
        notes,
      }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}
export function _loadAudioNotes(type) {
  return async (dispatch, getState) => {
    try {
      const notes = await noteService.getNotesByType(type)

      const action = {
        type: SET_AUDIO_NOTES,
        notes,
      }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}
export function _loadTodosNotes(type) {
  return async (dispatch, getState) => {
    try {
      const notes = await noteService.getNotesByType(type)

      const action = {
        type: SET_TODO_NOTES,
        notes,
      }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}
export function _loadTxtNotes(type) {
  return async (dispatch, getState) => {
    try {
      const notes = await noteService.getNotesByType(type)

      const action = {
        type: SET_TXT_NOTES,
        notes,
      }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}
export function _loadMapNotes(type) {
  return async (dispatch, getState) => {
    try {
      const notes = await noteService.getNotesByType(type)

      const action = {
        type: SET_MAP_NOTES,
        notes,
      }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}
export function updateTodoOrder(noteId, todos) {
  return async (dispatch) => {
    try {
      const updatedNote = await noteService.updateTodoOrder(noteId, todos)
      const action = { type: UPDATE_NOTE, note: updatedNote }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}
export function updateNoteOrder(items) {
  return async (dispatch) => {
    try {
      await noteService.updateNoteOrder(items)
      const action = { type: SET_NOTES, notes: items }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}
export function updateNote(url, noteId) {
  return async (dispatch) => {
    try {
      const note = await noteService.updateNote(url, noteId)
      const action = { type: UPDATE_NOTE, note }
      dispatch(action)
      showSuccessMsg('Note updated')
    } catch (error) {
      showErrorMsg('Cannot update note')
    }
  }
}

export function removeNote(noteId) {
  return async (dispatch) => {
    try {
      await noteService.remove(noteId)
      const action = { type: REMOVE_NOTE, noteId }
      dispatch(action)
      showSuccessMsg('Note removed')
      return 'Removed!'
    } catch (error) {
      console.log('error:', error)
      showErrorMsg('Cannot remove note')
    }
  }
}
export function updateTextNote(txt, noteId) {
  return async (dispatch) => {
    try {
      const updatedNote = await noteService.updateTextNote(txt, noteId)
      const action = { type: UPDATE_NOTE, note: updatedNote }
      dispatch(action)
      showSuccessMsg('Note updated')
    } catch (error) {
      console.log('error:', error)
      showErrorMsg('Cannot update note')
    }
  }
}
export function updateTodosText(noteId, todos) {
  return async (dispatch) => {
    try {
      const updatedNote = await noteService.updateTodosText(noteId, todos)
      const action = { type: UPDATE_NOTE, note: updatedNote }
      dispatch(action)
      showSuccessMsg('Note updated')
    } catch (error) {
      console.log('error:', error)
      showErrorMsg('Cannot update note')
    }
  }
}

export function saveNote(noteId) {
  return async (dispatch) => {
    try {
      const note = await noteService.getById(noteId)
      const action = { type: SAVE_NOTE, note }
      dispatch(action)
      showSuccessMsg('Note Transfered to archive')
    } catch (error) {
      console.log('error:', error)
      showErrorMsg('Cannot Transfered to archive')
    }
  }
}
export function addNoteToRemoveNotes(noteId) {
  return async (dispatch) => {
    try {
      const note = await noteService.getById(noteId)
      const action = { type: ADD_NOTE_TO_REMOVED_NOTE, note }
      dispatch(action)
      showSuccessMsg('Note has added to removed notes')
    } catch (error) {
      console.log('error:', error)
      showErrorMsg('Cannot add to removed notes')
    }
  }
}

export function changeNoteColor(color, noteId) {
  return async (dispatch) => {
    try {
      const updatedNote = await noteService.updateColor(color, noteId)
      const action = { type: UPDATE_NOTE, note: updatedNote }
      dispatch(action)
      showSuccessMsg('Note background color changed')
    } catch (error) {
      console.log('error:', error)
      showErrorMsg('Cannot change  Note background color')
    }
  }
}
export function addTxtNote(txt) {
  return async (dispatch) => {
    try {
      const note = await noteService.addTxtNote(txt)
      const action = { type: ADD_NOTE, note }
      dispatch(action)
      showSuccessMsg('Text note added')
    } catch (error) {
      console.log('error:', error)
      showSuccessMsg('Cannot add text note')
    }
  }
}
export function AddMap(lat, lng, zoom) {
  return async (dispatch) => {
    try {
      const note = await noteService.AddMapNote(lat, lng, zoom)

      const action = { type: ADD_NOTE, note }
      dispatch(action)
      showSuccessMsg('Map note added')
    } catch (error) {
      console.log('error:', error)
      showSuccessMsg('Cannot add map note')
    }
  }
}

export function addAudioNote(url) {
  return async (dispatch) => {
    try {
      const note = await noteService.addAudioNote(url)

      const action = { type: ADD_NOTE, note }
      dispatch(action)
      showSuccessMsg('Audio note added')
    } catch (error) {
      console.log('error:', error)
      showSuccessMsg('Cannot add audio note')
    }
  }
}
export function addVideoNote(url) {
  return async (dispatch) => {
    try {
      const note = await noteService.addVideoNote(url)

      const action = { type: ADD_NOTE, note }
      dispatch(action)
      showSuccessMsg('Video note added')
    } catch (error) {
      console.log('error:', error)
      showSuccessMsg('Cannot add video note')
    }
  }
}

export function addImageNote(url) {
  return async (dispatch) => {
    try {
      const note = await noteService.addImageNote(url)

      const action = { type: ADD_NOTE, note }
      dispatch(action)
      showSuccessMsg('Image note added')
    } catch (error) {
      console.log('error:', error)
      showSuccessMsg('Cannot add image note')
    }
  }
}

export function addTodoNote(todos) {
  return async (dispatch) => {
    try {
      const note = await noteService.addTodoNote(todos)

      const action = { type: ADD_NOTE, note }
      dispatch(action)
      showSuccessMsg('Todos note added')
    } catch (error) {
      console.log('error:', error)
      showSuccessMsg('Cannot add todos note')
    }
  }
}
export function changeNoteImage(image, noteId) {
  return async (dispatch) => {
    try {
      const updatedNote = await noteService.updateImage(image, noteId)
      const action = { type: UPDATE_NOTE, note: updatedNote }
      dispatch(action)
      showSuccessMsg('Note background image changed')
    } catch (error) {
      console.log('error:', error)
      showSuccessMsg('cannot change  background image ')
    }
  }
}
export function pinNote(noteId) {
  return async (dispatch) => {
    try {
      const updatedNote = await noteService.pinNote(noteId)
      const action = { type: UPDATE_NOTE, note: updatedNote }
      dispatch(action)
      showSuccessMsg('Note Pinned')
    } catch (error) {
      console.log('error:', error)
      showSuccessMsg('Cannot pinned note')
    }
  }
}
export function removeTodo(todoId, noteId) {
  return async (dispatch) => {
    try {
      const updated = await noteService.removeTodo(todoId, noteId)
      const action = { type: UPDATE_NOTE, note: updated }
      dispatch(action)
      showSuccessMsg('Todo removed')
    } catch (error) {
      console.log('error:', error)
      showSuccessMsg(' Cannot remove todo')
    }
  }
}

export function toggleTodoDone(todoId, noteId) {
  return async (dispatch) => {
    try {
      const updatedNote = await noteService.toggleTodoDone(todoId, noteId)
      const action = { type: UPDATE_NOTE, note: updatedNote }
      dispatch(action)
      showSuccessMsg('Todo done')
    } catch (error) {
      console.log('error:', error)
    }
  }
}
export function duplicateNote(noteId) {
  return async (dispatch) => {
    try {
      const duplicatedNote = await noteService.duplicate(noteId)
      const action = { type: DUPLICATE_NOTE, note: duplicatedNote }
      dispatch(action)
      showSuccessMsg('Note duplicated')
    } catch (error) {
      showSuccessMsg(' Cannot duplicate note')
    }
  }
}

export function setFilterBy(filterBy) {
  return (dispatch) => {
    dispatch({ type: SET_FILTER_BY, filterBy })
  }
}
