
import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  FolderKanban,
  BookOpen,
  Scale,
  ListTodo,
  ShieldCheck,
  MessageSquareText,
  ArrowLeftRight,
  Plus,
  ArrowUpRight,
  Activity,
  Clock3,
  CheckCircle2,
  CircleDashed,
  Sparkles,
  FileText,
} from 'lucide-react'

const sections = [
  {
    title: 'Projects',
    key: 'projects',
    storage: 'knowbridge_projects_v2',
    path: '/projects',
    icon: FolderKanban,
    color: 'bg-blue-50 text-blue-600',
    description: 'Manage your project workspaces',
  },
  {
    title: 'Knowledge Sources',
    key: 'sources',
    storage: 'knowbridge_sources',
    path: '/sources',
    icon: BookOpen,
    color: 'bg-purple-50 text-purple-600',
    description: 'Documents, links and code resources',
  },
  {
    title: 'Decisions',
    key: 'decisions',
    storage: 'knowbridge_decisions',
    path: '/decisions',
    icon: Scale,
    color: 'bg-amber-50 text-amber-600',
    description: 'Track important project decisions',
  },
  {
    title: 'Tasks',
    key: 'tasks',
    storage: 'knowbridge_tasks',
    path: '/tasks',
    icon: ListTodo,
    color: 'bg-green-50 text-green-600',
    description: 'Track work and responsibilities',
  },
  {
    title: 'Verification',
    key: 'verification',
    storage: 'knowbridge_verification',
    path: '/verification',
    icon: ShieldCheck,
    color: 'bg-cyan-50 text-cyan-600',
    description: 'Verify project information',
  },
  {
    title: 'Reviews',
    key: 'reviews',
    storage: 'knowbridge_reviews',
    path: '/review',
    icon: MessageSquareText,
    color: 'bg-pink-50 text-pink-600',
    description: 'Review and approve contributions',
  },
  {
    title: 'Handovers',
    key: 'handovers',
    storage: 'knowbridge_handovers',
    path: '/handover',
    icon: ArrowLeftRight,
    color: 'bg-orange-50 text-orange-600',
    description: 'Transfer project knowledge',
  },
]

function readItems(key) {
  try {
    const data = JSON.parse(localStorage.getItem(key) || '[]')
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

function formatDate(dateValue) {
  if (!dateValue) return ''

  const date = new Date(dateValue)

  if (Number.isNaN(date.getTime())) return ''

  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function Dashboard() {
  const [data, setData] = useState({})

  const loadDashboard = useCallback(() => {
    const result = {}

    sections.forEach((section) => {
      result[section.key] = readItems(section.storage)
    })

    setData(result)
  }, [])

  useEffect(() => {
    loadDashboard()

    // Updates from other browser tabs
    window.addEventListener('storage', loadDashboard)

    // Updates from pages in the same tab
    window.addEventListener('knowbridge_data_updated', loadDashboard)

    // Refresh when user returns to this browser tab
    window.addEventListener('focus', loadDashboard)

    return () => {
      window.removeEventListener('storage', loadDashboard)
      window.removeEventListener('knowbridge_data_updated', loadDashboard)
      window.removeEventListener('focus', loadDashboard)
    }
  }, [loadDashboard])

  const getCount = (key) => data[key]?.length || 0

  const getStatusCount = (key, status) => {
    return (data[key] || []).filter((item) => {
      return String(item.status || '').toLowerCase() === status.toLowerCase()
    }).length
  }

  const totalItems = sections.reduce(
    (total, section) => total + getCount(section.key),
    0
  )

  const completedTasks =
    getStatusCount('tasks', 'Completed') +
    getStatusCount('tasks', 'Done')

  const pendingTasks = Math.max(0, getCount('tasks') - completedTasks)

  const verifiedCount = getStatusCount('verification', 'Verified')
  const pendingVerification = getStatusCount('verification', 'Pending')
  const approvedReviews = getStatusCount('reviews', 'Approved')

  const verificationProgress = getCount('verification')
    ? Math.round((verifiedCount / getCount('verification')) * 100)
    : 0

  const reviewProgress = getCount('reviews')
    ? Math.round((approvedReviews / getCount('reviews')) * 100)
    : 0

  const recentItems = sections
    .flatMap((section) =>
      (data[section.key] || []).map((item) => ({
        id: item.id || item._id || item.title || item.name,
        title:
          item.title ||
          item.name ||
          item.taskName ||
          item.projectName ||
          'Untitled item',
        section: section.title,
        path: section.path,
        icon: section.icon,
        color: section.color,
        status: item.status || 'Added',
        date: item.createdAt || item.date || item.updatedAt || '',
      }))
    )
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime() || 0
      const dateB = new Date(b.date).getTime() || 0
      return dateB - dateA
    })
    .slice(0, 5)

  const statCards = [
    {
      label: 'Total Projects',
      value: getCount('projects'),
      note: 'Project workspaces',
      icon: FolderKanban,
      color: 'bg-blue-50 text-blue-600',
      path: '/projects',
    },
    {
      label: 'Knowledge Sources',
      value: getCount('sources'),
      note: 'Stored resources',
      icon: BookOpen,
      color: 'bg-purple-50 text-purple-600',
      path: '/sources',
    },
    {
      label: 'Total Tasks',
      value: getCount('tasks'),
      note: `${completedTasks} completed`,
      icon: ListTodo,
      color: 'bg-green-50 text-green-600',
      path: '/tasks',
    },
    {
      label: 'Handovers',
      value: getCount('handovers'),
      note: `${getStatusCount('handovers', 'Completed')} completed`,
      icon: ArrowLeftRight,
      color: 'bg-orange-50 text-orange-600',
      path: '/handover',
    },
  ]

  return (
    <div className="space-y-8 pb-10">

      {/* Welcome section */}
      <section className="relative overflow-hidden rounded-3xl bg-[#123b2d] p-7 text-white shadow-sm md:p-9">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-green-100">
            <Sparkles size={15} />
            Knowledge continuity workspace
          </div>

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Welcome to KnowBridge AI
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-7 text-green-100/80 md:text-base">
            Keep project knowledge organised, preserve important decisions
            and make every team handover smoother.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#123b2d] transition hover:bg-green-50"
            >
              Explore Projects
              <ArrowUpRight size={17} />
            </Link>

            <Link
              to="/sources"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Add Knowledge Source
              <Plus size={17} />
            </Link>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full border-[35px] border-white/5" />
        <div className="pointer-events-none absolute -bottom-32 right-28 h-64 w-64 rounded-full border-[30px] border-white/5" />
      </section>

      {/* Overview */}
      <section>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Workspace Overview
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              A quick look at your project knowledge
            </p>
          </div>

          <Link
  to="/workspace-summary"
  className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm text-gray-500 shadow-sm ring-1 ring-gray-100 transition hover:text-green-700"
>
  <Activity size={16} className="text-green-600" />
  Live workspace summary
  <ArrowUpRight size={15} />
</Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => {
            const Icon = card.icon

            return (
              <Link
                key={card.label}
                to={card.path}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    {card.label}
                  </span>
                  <div className={`rounded-xl p-2.5 ${card.color}`}>
                    <Icon size={20} />
                  </div>
                </div>

                <p className="mt-4 text-3xl font-bold text-gray-900">
                  {card.value}
                </p>
                <p className="mt-1 text-xs text-gray-400">{card.note}</p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Workspace modules */}
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold text-gray-900">
            Workspace Modules
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Access different areas of your knowledge management system
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {sections.map((section) => {
            const Icon = section.icon

            return (
              <Link
                key={section.key}
                to={section.path}
                className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className={`rounded-xl p-3 ${section.color}`}>
                    <Icon size={22} />
                  </div>

                  <ArrowUpRight
                    size={19}
                    className="text-gray-300 transition group-hover:text-green-700"
                  />
                </div>

                <h3 className="mt-4 font-semibold text-gray-900">
                  {section.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {section.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-xs text-gray-400">Total records</span>
                  <span className="text-lg font-bold text-gray-800">
                    {getCount(section.key)}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Activity and progress */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">

        {/* Recent activity */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Recent Workspace Items
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Recently stored project information
              </p>
            </div>
            <Clock3 size={20} className="text-gray-400" />
          </div>

          {recentItems.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {recentItems.map((item, index) => {
                const Icon = item.icon

                return (
                  <Link
                    to={item.path}
                    key={`${item.section}-${item.id || index}`}
                    className="flex items-center gap-3 py-4 transition hover:bg-gray-50"
                  >
                    <div className={`rounded-xl p-2.5 ${item.color}`}>
                      <Icon size={19} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-gray-800">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {item.section}
                        {item.date && ` • ${formatDate(item.date)}`}
                      </p>
                    </div>

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                      {item.status}
                    </span>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="rounded-xl bg-gray-50 px-4 py-10 text-center">
              <FileText size={30} className="mx-auto text-gray-300" />
              <p className="mt-3 text-sm font-medium text-gray-600">
                No workspace items yet
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Add projects, sources or tasks to see them here.
              </p>
              <Link
                to="/projects"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#174b37] px-4 py-2 text-sm font-medium text-white hover:bg-[#123b2d]"
              >
                <Plus size={16} />
                Create your first project
              </Link>
            </div>
          )}
        </div>

        {/* Review progress */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">
            Review Progress
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Current workflow status
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-gray-600">
                  <CheckCircle2 size={17} className="text-green-600" />
                  Verified
                </span>
                <span className="font-semibold text-gray-800">
                  {verifiedCount}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-green-500 transition-all"
                  style={{ width: `${verificationProgress}%` }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-gray-600">
                  <CircleDashed size={17} className="text-amber-500" />
                  Pending Verification
                </span>
                <span className="font-semibold text-gray-800">
                  {pendingVerification}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-amber-400 transition-all"
                  style={{
                    width: `${
                      getCount('verification')
                        ? (pendingVerification / getCount('verification')) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-gray-600">
                  <CheckCircle2 size={17} className="text-blue-600" />
                  Approved Reviews
                </span>
                <span className="font-semibold text-gray-800">
                  {approvedReviews}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all"
                  style={{ width: `${reviewProgress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-[#f1f7f3] p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#174b37]">
              <Activity size={17} />
              Workspace Summary
            </div>
            <p className="mt-2 text-3xl font-bold text-[#174b37]">
              {totalItems}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Total records across all modules
            </p>
          </div>

          <div className="mt-4 rounded-xl border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Pending Tasks</span>
              <span className="font-bold text-gray-900">{pendingTasks}</span>
            </div>
            <Link
              to="/tasks"
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#174b37] hover:underline"
            >
              View tasks <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
