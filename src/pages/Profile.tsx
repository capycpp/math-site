import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import netlifyIdentity from 'netlify-identity-widget'

export default function Profile() {
  const { user, logout } = useAuth()
  const [displayName, setDisplayName] = useState((user && (user.user_metadata as any)?.full_name) || '')
  const [status, setStatus] = useState<string | null>(null)

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setStatus(null)
    try {
      const current = netlifyIdentity.currentUser()
      if (!current) {
        setStatus('Not logged in')
        return
      }
      await current.update({ user_metadata: { full_name: displayName } })
      setStatus('Profile updated')
    } catch (err) {
      console.error(err)
      setStatus('Failed to update profile')
    }
  }

  if (!user) return <div>Please login to view your profile.</div>

  return (
    <div className="max-w-md">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      <div className="mb-4">Email: {user.email}</div>
      <form onSubmit={save} className="space-y-4">
        <div>
          <label className="block">Full name</label>
          <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full border p-2 rounded" />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-primary-500 text-white rounded" type="submit">Save</button>
          <button onClick={(e) => { e.preventDefault(); logout(); }} className="px-4 py-2 border rounded">Logout</button>
        </div>
      </form>
      {status && <div className="mt-4">{status}</div>}
    </div>
  )
}
