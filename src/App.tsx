import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import WeeklyList from './pages/WeeklyList'
import ChapterList from './pages/ChapterList'
import ShortHub from './pages/ShortHub'
import Quiz from './pages/Quiz'
import History from './pages/History'
import NotesList from './pages/NotesList'
import NoteView from './pages/NoteView'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weekly" element={<WeeklyList />} />
        <Route path="/chapters" element={<ChapterList />} />
        <Route path="/short" element={<ShortHub />} />
        <Route path="/notes" element={<NotesList />} />
        <Route path="/notes/:week" element={<NoteView />} />
        <Route path="/history" element={<History />} />
        <Route path="/quiz/:kind" element={<Quiz />} />
        <Route path="/quiz/:kind/:param" element={<Quiz />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}
