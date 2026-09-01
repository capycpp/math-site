import React, { useEffect, useState } from 'react'

export default function DarkModeToggle() {
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const root = window.document.documentElement
    if (mode === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
  }, [mode])

  return (
    <button
      onClick={() => setMode((m) => (m === 'light' ? 'dark' : 'light'))}
      className="px-3 py-1 rounded bg-white/20"
    >
      {mode === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
