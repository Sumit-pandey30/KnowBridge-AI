
import { useEffect, useState } from 'react'
import {
  UserRound,
  Mail,
  Phone,
  BriefcaseBusiness,
  ShieldCheck,
  Pencil,
  Save,
  X,
  CheckCircle2,
  LockKeyhole,
} from 'lucide-react'

const defaultProfile = {
  name: 'Workspace Admin',
  email: '',
  phone: '',
  role: 'Admin',
  workspace: 'KnowBridge AI',
}

const getSavedProfile = () => {
  try {
    const saved = JSON.parse(
      localStorage.getItem('knowbridge_profile') || '{}'
    )
    return { ...defaultProfile, ...saved }
  } catch {
    return { ...defaultProfile }
  }
}

export default function Profile() {
  const [profile, setProfile] = useState(getSavedProfile)
  const [originalProfile, setOriginalProfile] = useState(getSavedProfile)
  const [editing, setEditing] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const saved = getSavedProfile()
    setProfile(saved)
    setOriginalProfile(saved)
  }, [])

  const initials = profile.name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError('')
    setMessage('')
  }

  const handleEdit = () => {
    setOriginalProfile(profile)
    setEditing(true)
    setError('')
    setMessage('')
  }

  const handleCancel = () => {
    setProfile(originalProfile)
    setEditing(false)
    setError('')
    setMessage('')
  }

  const handleSave = () => {
    if (!profile.name.trim()) {
      setError('Please enter your full name.')
      return
    }

    if (
      profile.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)
    ) {
      setError('Please enter a valid email address.')
      return
    }

    const updatedProfile = {
      ...profile,
      name: profile.name.trim(),
      email: profile.email.trim(),
      phone: profile.phone.trim(),
    }

    localStorage.setItem(
      'knowbridge_profile',
      JSON.stringify(updatedProfile)
    )

    setProfile(updatedProfile)
    setOriginalProfile(updatedProfile)
    setEditing(false)
    setError('')
    setMessage('Your profile has been updated successfully.')

    window.dispatchEvent(
      new Event('knowbridge_profile_updated')
    )
  }

  const inputClass =
    'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-50 disabled:text-slate-500'

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-8">
      {/* Page heading */}
      <div>
        <p className="text-sm font-medium text-emerald-600">
          Account Settings
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-800">
          My Profile
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage your personal information and workspace details.
        </p>
      </div>

      {/* Profile header */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-28 bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-500" />

        <div className="flex flex-col gap-5 px-6 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="-mt-12 flex items-end gap-4">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-emerald-100 text-3xl font-bold text-emerald-700 shadow-sm">
              {initials || 'WA'}
            </div>

            <div className="pb-1">
              <h2 className="text-xl font-bold text-slate-800">
                {profile.name}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {profile.role} · {profile.workspace}
              </p>
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Active Account
              </span>
            </div>
          </div>

          {!editing && (
            <button
              onClick={handleEdit}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              <Pencil size={16} />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {message && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <CheckCircle2 size={18} />
          {message}
        </div>
      )}

      {/* Personal information */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
            <UserRound size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">
              Personal Information
            </h3>
            <p className="text-sm text-slate-500">
              Your basic account details
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <input
              name="name"
              value={profile.name}
              onChange={handleChange}
              disabled={!editing}
              placeholder="Enter your full name"
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!editing}
                placeholder="Enter your email address"
                className={`${inputClass} pl-10`}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Phone Number
            </label>
            <div className="relative">
              <Phone
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                name="phone"
                type="tel"
                value={profile.phone}
                onChange={handleChange}
                disabled={!editing}
                placeholder="Enter your phone number"
                className={`${inputClass} pl-10`}
              />
            </div>
          </div>
        </div>

        {editing && (
          <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              onClick={handleCancel}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              <X size={16} />
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Workspace information */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
            <BriefcaseBusiness size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">
              Workspace Information
            </h3>
            <p className="text-sm text-slate-500">
              Your role and workspace details
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Workspace Name
            </label>
            <input
              value={profile.workspace}
              disabled
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Account Role
            </label>
            <input
              value={profile.role}
              disabled
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
            <ShieldCheck size={22} />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-slate-800">
              Account Security
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Your profile information is currently stored in this
              browser. Password management and advanced security
              controls can be enabled when authentication is connected.
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
              <LockKeyhole size={16} />
              Authentication integration pending
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
