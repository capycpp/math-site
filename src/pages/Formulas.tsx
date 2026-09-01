import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Formula } from '../types'
import { getFormulas } from '../services/formulaService'

export default function Formulas() {
  const [items, setItems] = useState<Formula[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        setLoading(true)
        const data = await getFormulas()
        if (!mounted) return
        setItems(data)
      } catch (err: any) {
        console.error('Failed to load formulas:', err)
        if (!mounted) return
        setError(err.message || 'Unable to load formulas')
        setItems([])
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  if (loading) return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Formula Library</h2>
      <p className="text-slate-500">Loading formulas...</p>
    </div>
  )

  if (error) return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Formula Library</h2>
      <div className="p-4 rounded-lg border border-red-200 bg-red-50 text-red-700">{error}</div>
    </div>
  )

  if (!Array.isArray(items) || items.length === 0) return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Formula Library</h2>
      <div className="p-6 rounded-lg border bg-slate-50 text-slate-600">No formulas available.</div>
    </div>
  )

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Formula Library</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((f) => (
          <Link to={`/formulas/${f.id}`} key={f.id} className="p-4 border rounded">
            <h3 className="font-semibold">{f.title}</h3>
            <p className="text-sm text-slate-600">{f.category}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
