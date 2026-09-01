import React, { useEffect, useState } from 'react'
import { getFormulas } from '../../services/formulaService'

type Form = { id?: string; title: string; latex: string; explanation: string; category: string }

export default function AdminFormulas() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState<Form>({ title: '', latex: '', explanation: '', category: '' })

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const data = await getFormulas()
        if (!mounted) return
        setItems(data)
      } catch (err) {
        console.error(err)
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  async function create() {
    try {
      const res = await fetch('/.netlify/functions/admin-formulas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const j = await res.json()
      if (res.ok) setItems((s) => [...s, j.data])
      else console.error(j)
    } catch (err) { console.error(err) }
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Formulas</h3>
      {loading ? <div>Loading...</div> : (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {items.map((f) => (
              <div key={f.id} className="p-3 border rounded">
                <div className="font-semibold">{f.title}</div>
                <div className="text-sm text-slate-600">{f.category}</div>
              </div>
            ))}
          </div>

          <div className="p-4 border rounded">
            <h4 className="font-semibold mb-2">Create formula</h4>
            <input className="w-full mb-2 border p-2" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <input className="w-full mb-2 border p-2" placeholder="LaTeX" value={form.latex} onChange={(e) => setForm({ ...form, latex: e.target.value })} />
            <input className="w-full mb-2 border p-2" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <textarea className="w-full mb-2 border p-2" placeholder="Explanation" value={form.explanation} onChange={(e) => setForm({ ...form, explanation: e.target.value })} />
            <div className="flex gap-2">
              <button onClick={create} className="px-3 py-1 bg-primary-500 text-white rounded">Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
