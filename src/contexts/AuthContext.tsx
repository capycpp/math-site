import React, { createContext, useContext, useEffect, useState } from 'react'
import netlifyIdentity from 'netlify-identity-widget'

type User = {
  id: string
  email: string
  user_metadata?: any
}

type AuthContextValue = {
  user: User | null
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    netlifyIdentity.init()
    const current = netlifyIdentity.currentUser()
    if (current) setUser({ id: current.id as any, email: current.email as any })

    netlifyIdentity.on('login', (u: any) => {
      setUser({ id: u.id, email: u.email })
      netlifyIdentity.close()
    })
    netlifyIdentity.on('logout', () => setUser(null))
    return () => {
      netlifyIdentity.off('login')
      netlifyIdentity.off('logout')
    }
  }, [])

  function login() {
    netlifyIdentity.open('login')
  }
  function logout() {
    netlifyIdentity.logout()
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
