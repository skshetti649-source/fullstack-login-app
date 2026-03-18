import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        navigate('/login')
      } else {
        setEmail(user.email ?? '')
      }
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-indigo-600">MyApp</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{email}</span>
          <button onClick={handleLogout} className="text-sm bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg transition">
            Logout
          </button>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="bg-white rounded-2xl shadow p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome back! 👋</h2>
          <p className="text-gray-500">You are logged in as <span className="font-medium text-indigo-600">{email}</span></p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <p className="text-3xl font-bold text-indigo-600">1</p>
            <p className="text-sm text-gray-500 mt-1">Projects</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <p className="text-3xl font-bold text-green-500">100%</p>
            <p className="text-sm text-gray-500 mt-1">Complete</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <p className="text-3xl font-bold text-purple-500">Day 1</p>
            <p className="text-sm text-gray-500 mt-1">Learning streak</p>
          </div>
        </div>
      </div>
    </div>
  )
}