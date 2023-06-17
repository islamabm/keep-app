import { storageService } from './storage.service.js'
import { makeId } from './util.service.js'

export const noteService = {
  query,
  save,
  remove,
  getById,
  updateColor,
  updateImage,
  duplicate,
  pinNote,
  removeTodo,
  toggleTodoDone,
  getNotesByType,
  updateTodoOrder,
  updateNoteOrder,
  addTxtNote,
  addTodoNote,
  addImageNote,
  addAudioNote,
  addVideoNote,
  updateNote,
  AddMapNote,
  updateTextNote,
  updateTodosText,
}
const NOTE_KEY = 'notes'
_createNotes()

var gNotes = _loadNotes()

function query() {
  let notesToReturn = gNotes
  return Promise.resolve([...notesToReturn])
}

function getNotesByType(type) {
  const notes = gNotes.filter((note) => note.type === type)

  return Promise.resolve([...notes])
}
function getById(id) {
  const note = gNotes.find((note) => note._id === id)
  return Promise.resolve({ ...note })
}
async function updateNote(url, noteId) {
  const note = gNotes.find((note) => note._id === noteId)
  note.info.url = url

  return save(note)
}

async function addTxtNote(txt) {
  const note = getEmptyTxtNote(txt)
  const savedNote = await save(note)

  return savedNote
}
async function AddMapNote(lat, lng, zoom) {
  const note = getEmptyMapNote(lat, lng, zoom)
  const savedNote = await save(note)

  return savedNote
}

async function addAudioNote(url) {
  const note = getEmptyAudioNote(url)
  const savedNote = await save(note)

  return savedNote
}
async function addVideoNote(url) {
  const note = getEmptyVideoNote(url)
  const savedNote = await save(note)

  return savedNote
}
async function addImageNote(url) {
  const note = getEmptyImgNote(url)
  const savedNote = await save(note)

  return savedNote
}
async function addTodoNote(todos) {
  const note = getEmptyTodosNote(todos)
  const savedNote = await save(note)
  return savedNote
}

export async function duplicate(noteId) {
  const noteToDuplicate = await getById(noteId)
  if (!noteToDuplicate) return null

  const duplicatedNote = JSON.parse(JSON.stringify(noteToDuplicate))
  duplicatedNote._id = makeId()

  gNotes = [...gNotes, duplicatedNote]
  storageService.store(NOTE_KEY, gNotes)
  return duplicatedNote
}
export async function updateTodoOrder(noteId, todos) {
  const note = gNotes.find((note) => note._id === noteId)
  if (note) {
    note.info.todos = todos
    await save(note)
    return note
  }
  return null
}
export async function updateNoteOrder(items) {
  storageService.store(NOTE_KEY, items)
}

function remove(id) {
  const idx = gNotes.findIndex((note) => note._id === id)
  if (idx === -1) return Promise.reject('ID not found')
  gNotes.splice(idx, 1)
  storageService.store(NOTE_KEY, gNotes)
  return Promise.resolve()
}
export async function removeTodo(todoId, noteId) {
  const note = gNotes.find((note) => note._id === noteId)
  if (note) {
    const idx = note.info.todos.findIndex((todo) => todo._id === todoId)
    if (idx !== -1) {
      note.info.todos.splice(idx, 1)
      const updatedNote = await save(note)

      return updatedNote
    }
  }
  return null
}
export async function toggleTodoDone(todoId, noteId) {
  const note = gNotes.find((note) => note._id === noteId)
  const todoIdx = note.info.todos.findIndex((todo) => todo._id === todoId)
  const todo = note.info.todos.find((todo) => todo._id === todoId)
  todo.isDone = !todo.isDone
  note.info.todos.splice(todoIdx, 1, todo)
  await save(note)
  return note
}

function save(noteToSave) {
  if (noteToSave._id) {
    const idx = gNotes.findIndex((note) => note._id === noteToSave._id)
    gNotes.splice(idx, 1, noteToSave)
  } else {
    noteToSave._id = makeId()
    gNotes.push(noteToSave)
  }
  storageService.store(NOTE_KEY, gNotes)
  return Promise.resolve(noteToSave)
}

function _loadNotes() {
  let notes = storageService.load(NOTE_KEY)
  return notes
}

function _createNotes() {
  let notes = storageService.load(NOTE_KEY)
  if (!notes || !notes.length) {
    notes = []
    notes.push(_createTxtNote('Fullstack Me Baby!'))
    notes.push(_createTxtNote('Coding academy the best place to learn code'))
    notes.push(_createImgNotes())
    notes.push(_createVideoNote())
    notes.push(_createAudioNote())
    notes.push(_createTodosNote())
    storageService.store(NOTE_KEY, notes)
  }
}

function getEmptyTxtNote(txt = '') {
  return {
    createdAt: Date.now(),
    type: 'NoteTxt',
    isPinned: false,
    style: {
      backgroundColor: 'pink',
      backgroundImage: null,
    },
    info: {
      txt: txt,
    },
  }
}

function getEmptyAudioNote(url = '') {
  return {
    createdAt: Date.now(),
    type: 'NoteAudio',
    isPinned: false,
    style: {
      backgroundColor: 'white',
      backgroundImage: null,
    },
    info: {
      url: url,
      title: 'Bobi and Me',
    },
  }
}
function getEmptyMapNote(lat, lng, zoom) {
  return {
    createdAt: Date.now(),
    type: 'NoteMap',
    isPinned: false,
    style: {
      backgroundColor: 'white',
      backgroundImage: null,
    },
    info: {
      lat: lat || 32,
      lng: lng || 32,
      zoom: zoom || 10,
    },
  }
}

function getEmptyVideoNote(url = '') {
  return {
    createdAt: Date.now(),
    type: 'NoteVideo',
    isPinned: false,
    style: {
      backgroundColor: 'white',
      backgroundImage: null,
    },
    info: {
      url: url,
      title: 'Bobi and Me',
    },
  }
}

function getEmptyImgNote(url = '') {
  return {
    createdAt: Date.now(),
    type: 'NoteImg',
    isPinned: false,
    style: {
      backgroundColor: 'white',
      backgroundImage: null,
    },
    info: {
      url: url,
      title: 'Bobi and Me',
    },
  }
}

function getEmptyTodosNote(todos = []) {
  return {
    createdAt: Date.now(),
    type: 'NoteTodos',
    isPinned: false,
    style: {
      backgroundColor: 'pink',
      backgroundImage: null,
    },
    info: {
      title: 'Get my stuff together',
      todos: todos.map((todo) => ({
        _id: makeId(),
        txt: todo.txt,
        isDone: false,
      })),
    },
  }
}
function updateColor(color, id) {
  const note = gNotes.find((note) => note._id === id)
  note.style.backgroundColor = color
  return save(note)
}
function updateImage(image, id) {
  const note = gNotes.find((note) => note._id === id)
  note.style.backgroundImage = image
  return save(note)
}

function updateTextNote(txt, id) {
  const note = gNotes.find((note) => note._id === id)
  note.info.txt = txt
  return save(note)
}

function updateTodosText(id, todos) {
  const note = gNotes.find((note) => note._id === id)
  note.info.todos = todos
  return save(note)
}

function pinNote(id) {
  const note = gNotes.find((note) => note._id === id)

  note.isPinned = !note.isPinned

  return save(note)
}
function _createImgNotes() {
  return {
    _id: makeId(),
    createdAt: Date.now(),
    type: 'NoteImg',
    isPinned: false,
    style: {
      backgroundColor: '#ccff90',
      backgroundImage: null,
    },
    info: {
      url: 'https://nicekindergarten.com/wp-content/uploads/2019/08/early-coding-cocuk2.png',
      title: 'Bobi and Me',
    },
  }
}

function _createTodosNote() {
  return {
    _id: makeId(),
    createdAt: Date.now(),
    type: 'NoteTodos',
    isPinned: false,
    style: {
      backgroundColor: 'yellow',
      backgroundImage: null,
    },
    info: {
      title: 'Get my stuff together',
      todos: [
        { _id: makeId(), txt: 'Driving license', isDone: false },
        { _id: makeId(), txt: 'Coding power', isDone: false },
      ],
    },
  }
}

function _createTxtNote(txt) {
  return {
    createdAt: Date.now(),
    _id: makeId(),
    type: 'NoteTxt',
    isPinned: false,
    style: {
      backgroundColor: 'pink',
      backgroundImage: null,
    },
    info: {
      txt,
    },
  }
}

function _createVideoNote() {
  return {
    _id: makeId(),
    createdAt: Date.now(),
    type: 'NoteVideo',
    isPinned: false,
    style: {
      backgroundColor: 'white',
      backgroundImage: null,
    },
    info: {
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      title: 'loli and me',
    },
  }
}

function _createAudioNote() {
  return {
    _id: makeId(),
    createdAt: Date.now(),
    type: 'NoteAudio',
    isPinned: false,
    style: {
      backgroundColor: 'white',
      backgroundImage: null,
    },
    info: {
      url: 'http://commondatastorage.googleapis.com/codeskulptor-assets/Evillaugh.ogg',
      title: 'I Love Audio',
    },
  }
}

// function _createMapNote() {
//   return {
//     _id: makeId(),
//     createdAt: Date.now(),
//     type: 'NoteMap',
//     isPinned: false,
//     style: {
//       backgroundColor: 'white',
//       backgroundImage: null,
//     },
//     info: {
//       lat: 32.08,
//       lng: 34.78,
//       zoom: 10,
//     },
//   }
// }
