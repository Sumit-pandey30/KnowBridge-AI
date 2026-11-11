
import { useState } from 'react'
import {
  Settings,
  Building2,
  Users,
  Bell,
  Save,
  RotateCcw,
  CheckCircle2,
  Globe,
  ShieldCheck,
} from 'lucide-react'

const defaultSettings = {
  workspaceName: 'KnowBridge AI',
  description: 'A central workspace for project knowledge and team collaboration.',
  visibility: 'Private',
  notifications: true,
  projectUpdates: true,
  taskReminders: true,
}

function getSettings() {
  try {
    const saved = JSON.parse(
      localStorage.getItem('knowbridge_workspace_settings') || '{}'
    )
    return { ...defaultSettings, ...saved }
  } catch {
    return defaultSettings
  }
}

export default function WorkspaceSettings() {
  const [settings, setSettings] = useState(getSettings)
  const [message, setMessage] = useState('')

  const handleChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
    setMessage('')
  }

  const handleSave = () => {
    if (!settings.workspaceName.trim()) {
      setMessage('Workspace name cannot be empty.')
      return
    }

    localStorage.setItem(
      'knowbridge_workspace_settings',
      JSON.stringify(settings)
    )

    setMessage('Workspace settings saved successfully.')
  }

  const handleReset = () => {
    setSettings(defaultSettings)
    localStorage.setItem(
      'knowbridge_workspace_settings',
      JSON.stringify(defaultSettings)
    )
    setMessage('Settings restored to default.')
  }

  return (
    <div className="mx-auto max-w-5xl space-y-7">
      <div>
        <p className="text-sm font-medium text-emerald-700">
          Workspace / Settings
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Workspace Settings
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage your workspace information, preferences and notifications.
        </p>
      </div>

      {/* General Settings */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
            <Building2 size={22} />
          </div>
          <div>
            <h2 className="font-bold text-slate-900">General Information</h2>
            <p className="text-sm text-slate-500">
              Basic details about your workspace.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Workspace Name
            </label>
            <input
              value={settings.workspaceName}
              onChange={(e) => handleChange('workspaceName', e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              placeholder="Enter workspace name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Description
            </label>
            <textarea
              rows={3}
              value={settings.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              placeholder="Describe your workspace"
            />
          </div>
        </div>
      </section>

      {/* Access Settings */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h2 className="font-bold text-slate-900">Access & Visibility</h2>
            <p className="text-sm text-slate-500">
              Set your workspace visibility preference.
            </p>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Workspace Visibility
          </label>
          <select
            value={settings.visibility}
            onChange={(e) => handleChange('visibility', e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-600"
          >
            <option value="Private">Private</option>
            <option value="Public">Public</option>
          </select>
          <p className="mt-2 text-xs text-slate-400">
            This is a saved preference in the current prototype. Actual access
            control will require backend integration.
          </p>
        </div>
      </section>

      {/* Members */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-xl bg-purple-50 p-3 text-purple-700">
            <Users size={22} />
          </div>
          <div>
            <h2 className="font-bold text-slate-900">Workspace Members</h2>
            <p className="text-sm text-slate-500">
              Team member management.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
          <Globe size={20} className="text-slate-500" />
          <p className="text-sm text-slate-600">
            Member invitations and role management will be available after
            backend integration.
          </p>
        </div>
      </section>

      {/* Notifications */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-amber-50 p-3 text-amber-700">
            <Bell size={22} />
          </div>
          <div>
            <h2 className="font-bold text-slate-900">Notification Preferences</h2>
            <p className="text-sm text-slate-500">
              Choose which updates you want to receive.
            </p>
          </div>
        </div>

        {[
          {
            key: 'notifications',
            title: 'Enable Notifications',
            description: 'Turn workspace notifications on or off.',
          },
          {
            key: 'projectUpdates',
            title: 'Project Updates',
            description: 'Receive updates about project activities.',
          },
          {
            key: 'taskReminders',
            title: 'Task Reminders',
            description: 'Get reminders about assigned tasks.',
          },
        ].map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between gap-4 border-b border-slate-100 py-4 last:border-0"
          >
            <div>
              <p className="text-sm font-semibold text-slate-800">
                {item.title}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {item.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                handleChange(item.key, !settings[item.key])
              }
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                settings[item.key] ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
              aria-label={`Toggle ${item.title}`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                  settings[item.key] ? 'left-6' : 'left-1'
                }`}
              />
            </button>
          </div>
        ))}
      </section>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="text-sm text-emerald-700">
          {message && (
            <span className="flex items-center gap-2">
              <CheckCircle2 size={17} />
              {message}
            </span>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            <RotateCcw size={17} />
            Reset
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 rounded-xl bg-[#176344] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#125238]"
          >
            <Save size={17} />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}
