
import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  FolderKanban,
  Database,
  Lightbulb,
  ListTodo,
  ShieldCheck,
  ClipboardCheck,
  FileText,
  BrainCircuit,
  ChevronDown,
  UserRound,
  Settings,
  Shield,
  LogOut,
} from 'lucide-react'

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', path: '/projects', icon: FolderKanban },
  { name: 'Knowledge Sources', path: '/sources', icon: Database },
  { name: 'Decisions', path: '/decisions', icon: Lightbulb },
  { name: 'Tasks & Ownership', path: '/tasks', icon: ListTodo },
  { name: 'Verification', path: '/verification', icon: ShieldCheck },
  { name: 'Review & Approval', path: '/review', icon: ClipboardCheck },
  { name: 'Handover Reports', path: '/handover', icon: FileText },
]

const getProfile = () => {
  try {
    const saved = JSON.parse(
      localStorage.getItem('knowbridge_profile') || '{}'
    )

    return {
      name: saved.name?.trim() || 'Workspace Admin',
    }
  } catch {
    return { name: 'Workspace Admin' }
  }
}

function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [profile, setProfile] = useState(getProfile)
  const navigate = useNavigate()

  useEffect(() => {
    const updateProfile = () => setProfile(getProfile())

    window.addEventListener('storage', updateProfile)
    window.addEventListener('knowbridge_profile_updated', updateProfile)

    return () => {
      window.removeEventListener('storage', updateProfile)
      window.removeEventListener(
        'knowbridge_profile_updated',
        updateProfile
      )
    }
  }, [])

  const initials = profile.name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const goTo = (path) => {
    navigate(path)
    setMenuOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('knowbridge_logged_in')
    setMenuOpen(false)
    navigate('/login')
  }

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-slate-200 bg-white lg:flex">

      {/* Brand */}
      <div className="flex h-20 shrink-0 items-center gap-3 border-b border-slate-100 px-6">
        <div className="rounded-xl bg-[#176344] p-2.5 text-white shadow-sm">
          <BrainCircuit size={24} />
        </div>

        <div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900">
            KnowBridge AI
          </h1>
          <p className="text-[11px] font-medium tracking-wide text-emerald-700">
            KNOWLEDGE CONTINUITY
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-7">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
          Main Menu
        </p>

        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-[13px] font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#eaf5ef] text-[#176344]'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-[#176344]" />
                    )}

                    <Icon
                      size={19}
                      strokeWidth={isActive ? 2.4 : 1.8}
                    />
                    <span>{item.name}</span>
                  </>
                )}
              </NavLink>
            )
          })}
        </nav>
      </div>

      {/* Workspace Admin */}
      <div className="relative shrink-0 border-t border-slate-100 p-4">

        {menuOpen && (
          <div className="absolute bottom-[88px] left-4 right-4 z-50 overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-xl">

            <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Account & Workspace
            </p>

            <button
              onClick={() => goTo('/profile')}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-600 hover:bg-slate-50"
            >
              <UserRound size={17} />
              My Profile
            </button>

            <button
              onClick={() => goTo('/workspace-settings')}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-600 hover:bg-slate-50"
            >
              <Settings size={17} />
              Workspace Settings
            </button>

            <button
              onClick={() => goTo('/dashboard')}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-600 hover:bg-slate-50"
            >
              <Shield size={17} />
              Admin Dashboard
            </button>

            <div className="my-2 border-t border-slate-100" />

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <LogOut size={17} />
              Logout
            </button>

          </div>
        )}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition ${
            menuOpen ? 'bg-emerald-50' : 'hover:bg-slate-50'
          }`}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#176344] text-sm font-bold text-white">
            {initials}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-800">
              {profile.name}
            </p>
            <p className="mt-0.5 text-xs text-slate-400">
              Manage workspace
            </p>
          </div>

          <ChevronDown
            size={17}
            className={`text-slate-400 transition ${
              menuOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
