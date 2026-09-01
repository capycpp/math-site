import React from 'react'
import { Link } from 'react-router-dom'
import DarkModeToggle from './DarkModeToggle'
import Container from './ui/Container'

export default function Header() {
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
            <DarkModeToggle />
          </nav>
        </div>
      </Container>
    </header>
  )
}
