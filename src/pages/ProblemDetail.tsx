import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Problem } from '../types'
import { getProblems } from '../services/problemService'

export default function ProblemDetail() {
  const { id } = useParams()
  const [p, setP] = useState<Problem | null>(null)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    if (!id) return
    ;(async () => {
      try {
        setLoading(true)
        const list = await getProblems()
        if (!mounted) return
        const found = list.find((x) => x.id === id) || null
        setP(found)
      } catch (err) {
        console.error(err)
        if (!mounted) return
        setP(null)
      } finally {
        if (mounted) setLoading(false)
      }
    })()

    return () => {
      mounted = false
    }
  }, [id])

  function check() {
    if (!p) return
    setFeedback(answer.trim().toLowerCase() === p.answer.trim().toLowerCase() ? 'Correct' : 'Incorrect')
  }

  if (loading) return <div>Loading...</div>
  if (!p) return <div>Not found</div>

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">{p.title}</h2>
      <p className="mb-4">{p.question}</p>
      <div className="space-y-2">
        <input value={answer} onChange={(e) => setAnswer(e.target.value)} className="w-full border p-2 rounded" />
        <div className="flex gap-2">
          <button onClick={check} className="px-4 py-2 bg-primary-500 text-white rounded">Check Answer</button>
        </div>
        {feedback && <div className="mt-2">{feedback}</div>}
      </div>
    </div>
  )
}
