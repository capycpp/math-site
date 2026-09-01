import React from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import AdminFormulas from './AdminFormulas'
import AdminProblems from './AdminProblems'

export default function Admin() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
      <div className="flex gap-4 mb-6">
        <Link to="formulas" className="px-3 py-1 border rounded">Formulas</Link>
        <Link to="problems" className="px-3 py-1 border rounded">Problems</Link>
      </div>

      <Routes>
        <Route path="formulas" element={<AdminFormulas />} />
        <Route path="problems" element={<AdminProblems />} />
        <Route index element={<div>Select a section</div>} />
      </Routes>
    </div>
  )
}
