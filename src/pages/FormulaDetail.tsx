import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Formula } from '../types'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import { getFormulas } from '../services/formulaService'

export default function FormulaDetail() {
  const { id } = useParams()
  const [f, setF] = useState<Formula | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    if (!id) return
    ;(async () => {
      try {
        setLoading(true)
        const list = await getFormulas()
        if (!mounted) return
        const found = list.find((x) => x.id === id) || null
        setF(found)
      } catch (err) {
        console.error(err)
        if (!mounted) return
        setF(null)
      } finally {
        if (mounted) setLoading(false)
      }
    })()

    return () => {
      mounted = false
    }
  }, [id])

  if (loading) return <div>Loading...</div>
  if (!f) return <div>Not found</div>

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">{f.title}</h2>
      <div className="prose">
        <BlockMath math={f.latex} />
        <p>{f.explanation}</p>
      </div>
    </div>
  )
}
