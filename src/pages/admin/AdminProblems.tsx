import React, { useEffect, useState } from 'react'
import { getProblems } from '../../services/problemService'
import netlifyIdentity from 'netlify-identity-widget'

type Form = { id?: string; title: string; question: string; difficulty: string; answer: string }

export default function AdminProblems() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState<Form>({ title: '', question: '', difficulty: 'Easy', answer: '' })

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const data = await getProblems()
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
      const current = netlifyIdentity.currentUser()
      const token = current ? await current.jwt() : null
      const headers: any = { 'Content-Type': 'application/json' }
      if (token) headers['Authorization'] = `Bearer ${token}`
      const res = await fetch('/.netlify/functions/admin-problems', {
        method: 'POST',
        headers,
        body: JSON.stringify(form),
      })
      const j = await res.json()
      if (res.ok) setItems((s) => [...s, j.data])
      else console.error(j)
    } catch (err) { console.error(err) }
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Problems</h3>
      {loading ? <div>Loading...</div> : (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {items.map((p) => (
              <div key={p.id} className="p-3 border rounded">
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm text-slate-600">{p.difficulty}</div>
              </div>
            ))}
          </div>

          <div className="p-4 border rounded">
            <h4 className="font-semibold mb-2">Create problem</h4>
            <input className="w-full mb-2 border p-2" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <input className="w-full mb-2 border p-2" placeholder="Question" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} />
            <input className="w-full mb-2 border p-2" placeholder="Difficulty" value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })} />
            <input className="w-full mb-2 border p-2" placeholder="Answer" value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} />
            <div className="flex gap-2">
              <button onClick={create} className="px-3 py-1 bg-primary-500 text-white rounded">Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
