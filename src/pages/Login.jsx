
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  BrainCircuit,
  Network,
  FileText,
  CheckCircle2,
} from 'lucide-react'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    const users = JSON.parse(
      localStorage.getItem('knowbridge_users') || '[]'
    )

    const user = users.find(
      (item) =>
        item.email.toLowerCase() === email.trim().toLowerCase() &&
        item.password === password
    )

    if (!user) {
      setError('Invalid email or password. Please try again.')
      return
    }

    localStorage.setItem('knowbridge_logged_in', 'true')

    localStorage.setItem(
      'knowbridge_profile',
      JSON.stringify({
        name: user.name,
        email: user.email,
        role: 'Workspace Member',
        workspace: 'KnowBridge AI',
      })
    )

    window.dispatchEvent(new Event('knowbridge_profile_updated'))
    navigate('/dashboard')
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
          <span className="text-2xl font-bold tracking-tight">
            KnowBridge<span className="text-emerald-200"> AI</span>
          </span>
        </div>

        <div className="relative z-10 max-w-lg">
          <p className="text-emerald-200 text-sm font-semibold tracking-[3px] uppercase mb-5">
            Your Knowledge. Connected.
          </p>

          <h1 className="text-5xl font-bold leading-tight mb-6">
            Knowledge Stays.
            <br />
            Teams Move Forward.
          </h1>

          <p className="text-emerald-50/80 text-lg leading-8">
            Keep your team's knowledge, decisions and project
            information connected in one organized workspace.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4">

            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
              <Network size={25} className="mb-3 text-emerald-200" />
              <p className="font-semibold">Connected Knowledge</p>
              <p className="mt-1 text-sm text-emerald-100/70">
                Everything in one place
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
              <FileText size={25} className="mb-3 text-emerald-200" />
              <p className="font-semibold">Smart Handover</p>
              <p className="mt-1 text-sm text-emerald-100/70">
                No knowledge left behind
              </p>
            </div>

          </div>
        </div>

        <p className="relative z-10 text-sm text-emerald-100/60">
          © 2026 KnowBridge AI. All rights reserved.
        </p>
      </div>

      {/* Login form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">

        <div className="w-full max-w-md">

          <div className="lg:hidden flex items-center justify-center gap-2 mb-12 text-emerald-800">
            <BrainCircuit size={32} />
            <span className="text-2xl font-bold">KnowBridge AI</span>
          </div>

          <div className="mb-9">
            <p className="text-sm font-semibold text-emerald-700 mb-3">
              WELCOME BACK
            </p>

            <h2 className="text-4xl font-bold text-slate-800">
              Sign in to your account
            </h2>

            <p className="text-slate-500 mt-3">
              Continue managing your team's knowledge and projects.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">

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
                  placeholder="Enter your password"
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

            {error && (
              <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-700 py-3.5 font-semibold text-white shadow-lg shadow-emerald-700/20 transition hover:bg-emerald-800"
            >
              Sign In <ArrowRight size={19} />
            </button>

          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold text-emerald-700 hover:text-emerald-900"
            >
              Create Account
            </Link>
          </div>

          <div className="mt-10 flex items-center justify-center gap-2 text-xs text-slate-400">
            <CheckCircle2 size={15} />
            Your team's knowledge, organized in one place.
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login
