import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, initialized } = useAuth()

  // Basic role check: Netlify Identity can store roles in app_metadata or user_metadata
  const roles = (user as any)?.user_metadata?.roles || (user as any)?.app_metadata?.roles || []
  const isAdmin = Array.isArray(roles) ? roles.some((r: any) => String(r).toLowerCase() === 'admin') : false

  // If auth is still initializing, don't redirect yet — wait for result
  if (!initialized) return null
  if (!user) {
    // Try a best-effort fallback: inspect localStorage for Netlify session or JWT
    try {
      const raw = localStorage.getItem('gotrue.user') || localStorage.getItem('nf_jwt') || localStorage.getItem('netlifyUser')
      if (raw) {
        let roles: any[] = []
        if (raw.trim().startsWith('{')) {
          const parsed = JSON.parse(raw)
          const u = parsed.user || parsed
          roles = (u.user_metadata && u.user_metadata.roles) || (u.app_metadata && u.app_metadata.roles) || []
        } else {
          // assume JWT
          const parts = raw.split('.')
          if (parts.length >= 2) {
            const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))
            roles = (payload.user_metadata && payload.user_metadata.roles) || (payload.app_metadata && payload.app_metadata.roles) || []
          }
        }
        const found = Array.isArray(roles) ? roles.some((r: any) => String(r).toLowerCase() === 'admin') : false
        if (found) return <>{children}</>
      }
    } catch (e) {
      // ignore
    }
    return <Navigate to="/login" replace />
  }
  if (!isAdmin) return <Navigate to="/" replace />

  return <>{children}</>
}
