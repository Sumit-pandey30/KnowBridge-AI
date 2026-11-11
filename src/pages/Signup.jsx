
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  UserRound,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  BrainCircuit,
  Network,
  FileText,
  Phone,
  BriefcaseBusiness,
} from 'lucide-react'

function Signup() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [department, setDepartment] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSignup = (e) => {
    e.preventDefault()
    setError('')

    if (!/^[0-9]{10}$/.test(phone)) {
      setError('Please enter a valid 10-digit phone number.')
      return
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    const users = JSON.parse(
      localStorage.getItem('knowbridge_users') || '[]'
    )

    const alreadyExists = users.some(
      (user) =>
        user.email.toLowerCase() === email.trim().toLowerCase()
    )

    if (alreadyExists) {
      setError('An account with this email already exists.')
      return
    }

    const newUser = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      department,
      role: 'Member',
      workspace: 'KnowBridge AI',
      password,
    }

    users.push(newUser)

    localStorage.setItem(
      'knowbridge_users',
      JSON.stringify(users)
    )

    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-white flex">

      {/* Left visual section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#063d32] via-[#08765c] to-[#0c9b73] p-14 flex-col justify-between text-white">

        <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full border border-white/10" />
        <div className="absolute bottom-10 right-[-100px] h-96 w-96 rounded-full border border-white/10" />
        <div className="absolute top-1/3 right-10 h-64 w-64 rounded-full bg-emerald-300/10 blur-3xl" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-white/15 flex items-center justify-center">
            <BrainCircuit size={28} />
          </div>
          <span className="text-2xl font-bold">
            KnowBridge<span className="text-emerald-200"> AI</span>
          </span>
        </div>

        <div className="relative z-10 max-w-lg">
          <p className="text-emerald-200 text-sm font-semibold tracking-[3px] uppercase mb-5">
            Build. Connect. Preserve.
          </p>

          <h1 className="text-5xl font-bold leading-tight mb-6">
            Knowledge Stays.
            <br />
            Teams Move Forward.
          </h1>

          <p className="text-emerald-50/80 text-lg leading-8">
            Create a shared space where project knowledge
            stays organized, accessible and connected.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4">

            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
              <Network size={25} className="mb-3 text-emerald-200" />
              <p className="font-semibold">Team Collaboration</p>
              <p className="mt-1 text-sm text-emerald-100/70">
                Work together seamlessly
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
              <FileText size={25} className="mb-3 text-emerald-200" />
              <p className="font-semibold">Knowledge Hub</p>
              <p className="mt-1 text-sm text-emerald-100/70">
                Preserve every insight
              </p>
            </div>

          </div>
        </div>

        <p className="relative z-10 text-sm text-emerald-100/60">
          © 2026 KnowBridge AI. All rights reserved.
        </p>
      </div>

      {/* Signup form */}
      <div className="flex-1 flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-md">

          <div className="lg:hidden flex items-center justify-center gap-2 mb-8 text-emerald-800">
            <BrainCircuit size={32} />
            <span className="text-2xl font-bold">KnowBridge AI</span>
          </div>

          <div className="mb-7">
            <p className="text-sm font-semibold text-emerald-700 mb-3">
              GET STARTED
            </p>

            <h2 className="text-4xl font-bold text-slate-800">
              Create your account
            </h2>

            <p className="text-slate-500 mt-3">
              Join your team and keep knowledge connected.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name
              </label>

              <div className="relative">
                <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} />

                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} />

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Phone Number
              </label>

              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} />

                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, ''))
                  }
                  placeholder="Enter 10-digit phone number"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Department
              </label>

              <div className="relative">
                <BriefcaseBusiness className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} />

                <select
                  required
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                >
                  <option value="">Select your department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Product">Product</option>
                  <option value="Management">Management</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} />

                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-12 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} />

                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-700 py-3.5 font-semibold text-white shadow-lg shadow-emerald-700/20 transition hover:bg-emerald-800"
            >
              Create Account <ArrowRight size={19} />
            </button>

          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-emerald-700 hover:text-emerald-900"
            >
              Sign In
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Signup
