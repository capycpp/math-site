import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()

  // Basic role check: Netlify Identity can store roles in app_metadata or user_metadata
  const roles = (user as any)?.user_metadata?.roles || (user as any)?.app_metadata?.roles || []
  const isAdmin = Array.isArray(roles) ? roles.includes('admin') : false

  if (!user) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/" replace />

  return <>{children}</>
}
