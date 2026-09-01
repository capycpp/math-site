import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Problem, ProblemsApiResponse } from '../types'
import { getProblems } from '../services/problemService'

export default function Problems() {
  const [items, setItems] = useState<Problem[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    const loadProblems = async () => {
      try {
        setLoading(true)
        setError(null)

        const data = await getProblems()
        if (!mounted) return
        setItems(data)
      } catch (err) {
        console.error('Failed to load problems:', err)
        if (!mounted) return
        setError('Unable to load problems. Please try again.')
        setItems([])
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadProblems()

    return () => {
      mounted = false
    }
  }, [])

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Problem Bank</h2>
        <p className="text-slate-500">Loading problems...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Problem Bank</h2>
        <div className="p-4 rounded-lg border border-red-200 bg-red-50 text-red-700">{error}</div>
      </div>
    )
  }

  if (!Array.isArray(items) || items.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Problem Bank</h2>
        <div className="p-6 rounded-lg border bg-slate-50 text-slate-600">No problems are available yet.</div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Problem Bank</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {Array.isArray(items) &&
          items.map((p) => (
            <Link to={`/problems/${p.id}`} key={p.id} className="p-4 border rounded-lg hover:shadow-md transition">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm text-slate-600">{p.difficulty}</p>
            </Link>
          ))}
      </div>
    </div>
  )
}