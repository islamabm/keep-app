export const SET_NOTES = 'SET_NOTES'
export const SET_IMAGE_NOTES = 'SET_IMAGE_NOTES'
export const SET_VIDEO_NOTES = 'SET_VIDEO_NOTES'
export const SET_AUDIO_NOTES = 'SET_AUDIO_NOTES'

export const SET_TODO_NOTES = 'SET_TODO_NOTES'
export const SET_TXT_NOTES = 'SET_TXT_NOTES'
export const ADD_NOTE = 'ADD_NOTE'
export const REMOVE_NOTE = 'REMOVE_NOTE'
export const SET_MAP_NOTES = 'SET_MAP_NOTES'
export const UPDATE_NOTE = 'UPDATE_NOTE'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const DUPLICATE_NOTE = 'DUPLICATE_NOTE'
export const REMOVE_TODO = 'REMOVE_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SAVE_NOTE = 'SAVE_NOTE'
export const ADD_NOTE_TO_REMOVED_NOTE = 'ADD_NOTE_TO_REMOVED_NOTE'
const INITIAL_STATE = {
  notes: null,
  filterBy: {
    txt: '',
  },
  removedNotes: [],
  savedNotes: [],
  imageNotes: [],
  todoNotes: [],
  txtNotes: [],
  mapNotes: [],

  videoNotes: [],
  audioNotes: [],
}

export function noteReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_NOTES:
      return {
        ...state,
        notes: action.notes,
      }
    case SET_IMAGE_NOTES:
      return {
        ...state,
        imageNotes: action.notes,
      }
    case SET_VIDEO_NOTES:
      return {
        ...state,
        videoNotes: action.notes,
      }
    case SET_AUDIO_NOTES:
      return {
        ...state,
        audioNotes: action.notes,
      }
    case SET_TODO_NOTES:
      return {
        ...state,
        todoNotes: action.notes,
      }
    case SET_TXT_NOTES:
      return {
        ...state,
        txtNotes: action.notes,
      }
    case SET_MAP_NOTES:
      return {
        ...state,
        mapNotes: action.notes,
      }
    case DUPLICATE_NOTE:
      return { ...state, notes: [...state.notes, action.note] }
    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.note],
      }
    case ADD_NOTE_TO_REMOVED_NOTE:
      return {
        ...state,
        removedNotes: [...state.removedNotes, action.note],
      }
    case SAVE_NOTE:
      return {
        ...state,
        savedNotes: [...state.savedNotes, action.note],
      }

    case REMOVE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== action.noteId),
      }
    case TOGGLE_TODO:
      return {
        ...state,
        notes: state.notes,
      }
    case REMOVE_TODO:
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note._id === action.noteId) {
            note.info.todos = note.info.todos.filter(
              (todo) => todo._id !== action.todoId
            )
          }
          return note
        }),
      }
    case UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note._id === action.note._id ? action.note : note
        ),
      }
    case SET_FILTER_BY:
      return {
        ...state,
        filterBy: { ...action.filterBy },
      }

    default:
      return state
  }
}
