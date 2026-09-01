import React from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import AdminFormulas from './AdminFormulas'
import AdminProblems from './AdminProblems'
import { useAuth } from '../../contexts/AuthContext'

export default function Admin() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
      <AuthDebug />
      <div className="flex gap-4 mb-6">
        <Link to="/admin/formulas" className="px-3 py-1 border rounded">Formulas</Link>
        <Link to="/admin/problems" className="px-3 py-1 border rounded">Problems</Link>
      </div>

      <Routes>
        <Route path="formulas" element={<AdminFormulas />} />
        <Route path="problems" element={<AdminProblems />} />
        <Route index element={<div>Select a section</div>} />
      </Routes>
    </div>
  )
}

function AuthDebug() {
  const { user, initialized } = useAuth()
  return (
    <div className="mb-4 p-3 border rounded bg-white/5">
      <div className="text-sm">Auth initialized: {String(initialized)}</div>
      <div className="text-sm">User: <pre className="whitespace-pre-wrap">{JSON.stringify(user, null, 2)}</pre></div>
    </div>
  )
}
