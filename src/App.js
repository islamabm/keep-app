import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import './assets/scss/global.scss'
// import { AppHeader } from './cmps/AppHeader'
// import { AppNav } from './cmps/AppNav'
import { NoteIndex } from './views/NoteIndex'
import { MainLayout } from '../src/cmps/MainLayout'

import { CanvasLayout } from '../src/cmps/CanvasLayout'
import { SavedNotes } from './views/SavedNotes'
import { TxtNotes } from './views/TxtNotes'
import { AudioNotes } from './views/AudioNotes'
import { VideoNotes } from './views/VideoNotes'
import { ImageNotes } from './views/ImageNotes'
import { TodoNotes } from './views/TodoNotes'
import { MapNotes } from './views/MapNotes'
import Canvas from './views/Canvas'

import { RemovedNotes } from './views/RemovedNotes'
import { FilterByType } from './views/FilterByType'
import Signup from './views/Signup'
import { UserMsg } from './cmps/UserMsg'
function App() {
  return (
    <Router>
      <section className="-app">
        <UserMsg />
        <section className="bab">
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/" element={<MainLayout />}>
              <Route path="notes" element={<NoteIndex />} />
              <Route path="save" element={<SavedNotes />} />
              <Route path="removed" element={<RemovedNotes />} />
              <Route path="search" element={<FilterByType />} />
              <Route path="search/image" element={<ImageNotes />} />
              <Route path="search/video" element={<VideoNotes />} />
              <Route path="search/audio" element={<AudioNotes />} />
              <Route path="search/txt" element={<TxtNotes />} />
              <Route path="search/todo" element={<TodoNotes />} />
              <Route path="search/map" element={<MapNotes />} />
            </Route>
            <Route path="/canvas" element={<CanvasLayout />}>
              <Route index element={<Canvas />} />
            </Route>
          </Routes>
        </section>
      </section>
    </Router>
  )
}

export default App
