import React, { createContext, useContext, useEffect, useState } from 'react'
import netlifyIdentity from 'netlify-identity-widget'

type NetlifyUser = {
  id: string
  email: string
  user_metadata?: Record<string, unknown>
  app_metadata?: Record<string, unknown>
}

type AuthContextValue = {
  user: NetlifyUser | null
  login: () => void
  signup: () => void
  logout: () => void
  open: (view?: string) => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<NetlifyUser | null>(null)

  useEffect(() => {
    netlifyIdentity.init()
    // Try to read current user from the widget
    let current = netlifyIdentity.currentUser()
    if (current) {
      setUser({ id: current.id as any, email: current.email as any, user_metadata: current.user_metadata, app_metadata: current.app_metadata })
    } else {
      // Fallback: some setups persist session in localStorage under 'gotrue.user'
      try {
        const raw = localStorage.getItem('gotrue.user') || localStorage.getItem('nf_jwt') || localStorage.getItem('netlifyUser')
        if (raw) {
          const parsed = JSON.parse(raw)
          const u = parsed.user || parsed
          if (u && (u.id || u.email)) {
            setUser({ id: u.id as any, email: u.email as any, user_metadata: (u.user_metadata as any) || {}, app_metadata: (u.app_metadata as any) || {} })
          }
        }
      } catch (e) {
        // ignore parse errors
      }

      // retry once after a short delay — some identity widget setups initialize later
      setTimeout(() => {
        current = netlifyIdentity.currentUser()
        if (current) setUser({ id: current.id as any, email: current.email as any, user_metadata: current.user_metadata, app_metadata: current.app_metadata })
      }, 200)
    }

    function handleLogin(u: any) {
      setUser({ id: u.id, email: u.email, user_metadata: u.user_metadata, app_metadata: u.app_metadata })
      netlifyIdentity.close()
    }

    function handleLogout() {
      setUser(null)
    }

    netlifyIdentity.on('login', handleLogin)
    netlifyIdentity.on('logout', handleLogout)
    return () => {
      try {
        netlifyIdentity.off('login', handleLogin)
        netlifyIdentity.off('logout', handleLogout)
      } catch (e) {
        // ignore
      }
    }
  }, [])

  function login() {
    netlifyIdentity.open('login')
  }
  function signup() {
    netlifyIdentity.open('signup')
  }
  function logout() {
    netlifyIdentity.logout()
  }
  function open(view?: string) {
    netlifyIdentity.open(view)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, open }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
