import React from 'react'
import { Link } from 'react-router-dom'
import DarkModeToggle from './DarkModeToggle'
import { useAuth } from '../contexts/AuthContext'
import Container from './ui/Container'

export default function Header() {
  const { user, login, logout } = useAuth()

  return (
    <header className="hero-gradient text-white">
      <Container>
        <div className="py-4 flex items-center justify-between">
          <Link to="/" className="font-bold text-xl">
            MathSite
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/formulas">Formulas</Link>
            <Link to="/problems">Problems</Link>
            <Link to="/dashboard">Dashboard</Link>
            {user ? (
              <>
                <span className="text-sm">{(user && user.email) || 'User'}</span>
                <button onClick={logout} className="px-3 py-1 bg-white/20 rounded">Logout</button>
              </>
            ) : (
              <button onClick={login} className="px-3 py-1 bg-white/20 rounded">Login</button>
            )}
            <DarkModeToggle />
          </nav>
        </div>
      </Container>
    </header>
  )
}
