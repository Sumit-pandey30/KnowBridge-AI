
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Bell,
  Search,
  ChevronDown,
  UserRound,
  Settings,
  Shield,
  LogOut,
  X,
  FolderKanban,
  LayoutDashboard,
  Database,
  Lightbulb,
  ListTodo,
  ShieldCheck,
  ClipboardCheck,
  FileText,
} from 'lucide-react'

const pageNames = {
  '/dashboard': 'Dashboard',
  '/projects': 'Projects',
  '/sources': 'Knowledge Sources',
  '/decisions': 'Decisions',
  '/tasks': 'Tasks & Ownership',
  '/verification': 'Verification',
  '/review': 'Review & Approval',
  '/handover': 'Handover Reports',
  '/profile': 'My Profile',
}

const searchPages = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', path: '/projects', icon: FolderKanban },
  { name: 'Knowledge Sources', path: '/sources', icon: Database },
  { name: 'Decisions', path: '/decisions', icon: Lightbulb },
  { name: 'Tasks & Ownership', path: '/tasks', icon: ListTodo },
  { name: 'Verification', path: '/verification', icon: ShieldCheck },
  { name: 'Review & Approval', path: '/review', icon: ClipboardCheck },
  { name: 'Handover Reports', path: '/handover', icon: FileText },
  { name: 'My Profile', path: '/profile', icon: UserRound },
]

const getProfile = () => {
  try {
    const saved = JSON.parse(
      localStorage.getItem('knowbridge_profile') || '{}'
    )

    return {
      name: saved.name?.trim() || 'Workspace Admin',
      email: saved.email || '',
    }
  } catch {
    return {
      name: 'Workspace Admin',
      email: '',
    }
  }
}

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [profile, setProfile] = useState(getProfile)

  useEffect(() => {
    const updateProfile = () => setProfile(getProfile())

    window.addEventListener('storage', updateProfile)
    window.addEventListener('knowbridge_profile_updated', updateProfile)

    return () => {
      window.removeEventListener('storage', updateProfile)
      window.removeEventListener('knowbridge_profile_updated', updateProfile)
    }
  }, [])

  const initials = profile.name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const title = pageNames[location.pathname] || 'Dashboard'

  const filteredPages = searchPages.filter((page) =>
    page.name.toLowerCase().includes(search.toLowerCase())
  )

  const goTo = (path) => {
    navigate(path)
    setSearch('')
    setSearchOpen(false)
    setProfileOpen(false)
    setNotificationOpen(false)
  }

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between gap-3 border-b border-slate-200 bg-white/95 px-5 backdrop-blur md:px-8">

      {/* Page title */}
      <div className="min-w-0">
        <p className="text-xs text-slate-400">
          Workspace / {title}
        </p>
        <h2 className="mt-1 truncate text-lg font-bold text-slate-900">
          {title}
        </h2>
      </div>

      {/* Right side actions */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">

        {/* Search */}
        <div className="relative hidden sm:block">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 transition focus-within:border-emerald-500 focus-within:bg-white">
            <Search size={17} className="text-slate-400" />

            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setSearchOpen(true)
              }}
              onFocus={() => setSearchOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && filteredPages.length > 0) {
                  goTo(filteredPages[0].path)
                }
                if (e.key === 'Escape') setSearchOpen(false)
              }}
              placeholder="Search pages..."
              className="w-36 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />

            {search && (
              <button onClick={() => setSearch('')}>
                <X size={15} className="text-slate-400" />
              </button>
            )}
          </div>

          {searchOpen && search && (
            <>
              <button
                className="fixed inset-0 z-30 cursor-default"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search results"
              />

              <div className="absolute right-0 top-14 z-40 w-72 overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Pages
                </p>

                {filteredPages.length > 0 ? (
                  filteredPages.map((page) => {
                    const Icon = page.icon

                    return (
                      <button
                        key={page.path}
                        onClick={() => goTo(page.path)}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
                      >
                        <Icon size={17} />
                        {page.name}
                      </button>
                    )
                  })
                ) : (
                  <p className="px-3 py-5 text-center text-sm text-slate-400">
                    No matching pages found
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setNotificationOpen(!notificationOpen)
              setProfileOpen(false)
              setSearchOpen(false)
            }}
            className={`relative rounded-xl border p-2.5 transition ${
              notificationOpen
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}
            aria-label="Notifications"
          >
            <Bell size={19} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
          </button>

          {notificationOpen && (
            <div className="absolute right-0 top-14 z-50 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">
                  Notifications
                </h3>
                <button
                  onClick={() => setNotificationOpen(false)}
                  className="text-slate-400 hover:text-slate-700"
                >
                  <X size={17} />
                </button>
              </div>

              <div className="py-7 text-center">
                <Bell size={25} className="mx-auto text-slate-300" />
                <p className="mt-3 text-sm font-medium text-slate-600">
                  No new notifications
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Updates will appear here.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen(!profileOpen)
              setNotificationOpen(false)
              setSearchOpen(false)
            }}
            className={`flex items-center gap-2 rounded-xl border p-1.5 pr-2.5 transition ${
              profileOpen
                ? 'border-emerald-200 bg-emerald-50'
                : 'border-transparent hover:bg-slate-50'
            }`}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#176344] text-xs font-bold text-white">
              {initials}
            </div>

            <ChevronDown
              size={16}
              className={`hidden text-slate-400 transition sm:block ${
                profileOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-14 z-50 w-60 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">

              <div className="border-b border-slate-100 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">
                  {profile.name}
                </p>
                <p className="mt-1 truncate text-xs text-slate-500">
                  {profile.email || 'KnowBridge AI'}
                </p>
              </div>

              <div className="p-2">
                <button
                  onClick={() => goTo('/profile')}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-600 hover:bg-slate-50"
                >
                  <UserRound size={17} />
                  My Profile
                </button>

                <button
                  onClick={() => goTo('/projects')}
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
              </div>

              <div className="border-t border-slate-100 p-2">
                <button
                  onClick={() => setProfileOpen(false)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-500 hover:bg-slate-50"
                >
                  <LogOut size={17} />
                  Close Menu
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
