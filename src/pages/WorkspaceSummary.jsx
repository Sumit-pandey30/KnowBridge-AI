
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Activity,
  FolderKanban,
  BookOpen,
  ListTodo,
  Scale,
  ShieldCheck,
  MessageSquareText,
  ArrowLeftRight,
} from 'lucide-react'

const modules = [
  { name: 'Projects', key: 'projects', storage: 'knowbridge_projects_v2', color: '#3B82F6', icon: FolderKanban, path: '/projects' },
  { name: 'Sources', key: 'sources', storage: 'knowbridge_sources', color: '#8B5CF6', icon: BookOpen, path: '/sources' },
  { name: 'Decisions', key: 'decisions', storage: 'knowbridge_decisions', color: '#F59E0B', icon: Scale, path: '/decisions' },
  { name: 'Tasks', key: 'tasks', storage: 'knowbridge_tasks', color: '#22C55E', icon: ListTodo, path: '/tasks' },
  { name: 'Verification', key: 'verification', storage: 'knowbridge_verification', color: '#06B6D4', icon: ShieldCheck, path: '/verification' },
  { name: 'Reviews', key: 'reviews', storage: 'knowbridge_reviews', color: '#EC4899', icon: MessageSquareText, path: '/review' },
  { name: 'Handovers', key: 'handovers', storage: 'knowbridge_handovers', color: '#F97316', icon: ArrowLeftRight, path: '/handover' },
]

function readItems(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]')
    return Array.isArray(value) ? value : []
  } catch {
    return []
  }
}

function WorkspaceSummary() {
  const [counts, setCounts] = useState({})

  useEffect(() => {
    const loadData = () => {
      const result = {}

      modules.forEach((module) => {
        result[module.key] = readItems(module.storage).length
      })

      setCounts(result)
    }

    loadData()

    window.addEventListener('storage', loadData)
    window.addEventListener('knowbridge_data_updated', loadData)
    window.addEventListener('focus', loadData)

    return () => {
      window.removeEventListener('storage', loadData)
      window.removeEventListener('knowbridge_data_updated', loadData)
      window.removeEventListener('focus', loadData)
    }
  }, [])

  const total = modules.reduce(
    (sum, module) => sum + (counts[module.key] || 0),
    0
  )

  let currentAngle = 0

  const gradient = total > 0
    ? `conic-gradient(${modules
        .map((module) => {
          const value = counts[module.key] || 0
          const start = currentAngle
          currentAngle += (value / total) * 360
          return `${module.color} ${start}deg ${currentAngle}deg`
        })
        .join(', ')})`
    : '#e5e7eb'

  return (
    <div className="space-y-7 pb-10">

      <div>
        <Link
          to="/dashboard"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-green-700"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>

        <div className="rounded-3xl bg-[#123b2d] p-7 text-white md:p-9">
          <div className="flex items-center gap-2 text-sm text-green-100">
            <Activity size={17} />
            Workspace Analytics
          </div>

          <h1 className="mt-3 text-3xl font-bold">
            Workspace Summary
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-green-100/80">
            Visualise your knowledge management activity and understand
            how information is distributed across your workspace.
          </p>

          <p className="mt-6 text-4xl font-bold">{total}</p>

          <p className="mt-1 text-sm text-green-100/80">
            Total records across all modules
          </p>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">
            Workspace Distribution
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Records across different modules
          </p>

          <div className="flex min-h-[340px] flex-col items-center justify-center">
            <div
              className="relative flex h-60 w-60 items-center justify-center rounded-full"
              style={{ background: gradient }}
            >
              <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white shadow-inner">
                <span className="text-3xl font-bold text-gray-900">
                  {total}
                </span>
                <span className="text-xs text-gray-500">
                  Total Records
                </span>
              </div>
            </div>

            {total === 0 && (
              <p className="mt-4 text-sm text-gray-400">
                Add records to your modules to see the chart.
              </p>
            )}

            <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2">
              {modules.map((module) => (
                <div key={module.key} className="flex items-center gap-2 text-xs text-gray-600">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: module.color }}
                  />
                  {module.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">
            Module Breakdown
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Total records in each module
          </p>

          <div className="mt-7 space-y-5">
            {modules.map((module) => {
              const Icon = module.icon
              const count = counts[module.key] || 0
              const percentage = total
                ? Math.round((count / total) * 100)
                : 0

              return (
                <div key={module.key}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Icon size={17} style={{ color: module.color }} />
                      {module.name}
                    </div>

                    <span className="text-sm font-semibold text-gray-800">
                      {count} ({percentage}%)
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: module.color,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900">
          Workspace Records
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => {
            const Icon = module.icon

            return (
              <Link
                key={module.key}
                to={module.path}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="rounded-xl p-3"
                    style={{
                      backgroundColor: `${module.color}15`,
                      color: module.color,
                    }}
                  >
                    <Icon size={21} />
                  </div>

                  <span className="text-2xl font-bold text-gray-900">
                    {counts[module.key] || 0}
                  </span>
                </div>

                <h3 className="mt-4 font-semibold text-gray-800">
                  {module.name}
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  View module records
                </p>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default WorkspaceSummary
