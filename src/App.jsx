
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

import Login from './pages/Login'
import Signup from './pages/Signup'

import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import KnowledgeSources from './pages/KnowledgeSources'
import Decisions from './pages/Decisions'
import Tasks from './pages/Tasks'
import Verification from './pages/Verification'
import Review from './pages/Review'
import Handover from './pages/Handover'
import Profile from './pages/Profile'
import WorkspaceSettings from './pages/WorkspaceSettings'
import WorkspaceSummary from './pages/WorkspaceSummary'

function ProtectedLayout() {
  const isLoggedIn =
    localStorage.getItem('knowbridge_logged_in') === 'true'

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-[#f6f8f7]">
      <Sidebar />

      <main className="min-h-screen lg:pl-64">
        <Navbar />

        <div className="mx-auto max-w-[1500px] p-5 md:p-8">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/sources" element={<KnowledgeSources />} />
            <Route path="/decisions" element={<Decisions />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/review" element={<Review />} />
            <Route path="/handover" element={<Handover />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/workspace-settings"
              element={<WorkspaceSettings />}
            />
            <Route
              path="/workspace-summary"
              element={<WorkspaceSummary />}
            />

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/*" element={<ProtectedLayout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
