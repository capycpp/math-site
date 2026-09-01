import React from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function Register() {
  const { login } = useAuth()
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <p className="mb-4">Register through Netlify Identity.</p>
      <button onClick={login} className="px-4 py-2 bg-primary-500 text-white rounded">
        Open Register
      </button>
    </div>
  )
}
