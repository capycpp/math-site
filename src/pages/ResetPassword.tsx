import React, { useState } from 'react'

export default function ResetPassword() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus(null)
    try {
      const res = await fetch('/.netlify/identity/recover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('Password reset email sent. Check your inbox.')
      } else {
        const j = await res.json()
        setStatus(j?.error || 'Failed to send reset email.')
      }
    } catch (err) {
      console.error(err)
      setStatus('Failed to send reset email.')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 rounded" />
        </div>
        <button className="px-4 py-2 bg-primary-500 text-white rounded" type="submit">Send reset email</button>
      </form>
      {status && <div className="mt-4">{status}</div>}
    </div>
  )
}
