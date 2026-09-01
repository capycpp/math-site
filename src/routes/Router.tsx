import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Formulas from '../pages/Formulas'
import FormulaDetail from '../pages/FormulaDetail'
import Problems from '../pages/Problems'
import ProblemDetail from '../pages/ProblemDetail'
import Dashboard from '../pages/Dashboard'
import Admin from '../pages/Admin'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'
import Exams from '../pages/Problems'

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/formulas" element={<Formulas />} />
      <Route path="/formulas/:id" element={<FormulaDetail />} />
      <Route path="/problems" element={<Problems />} />
      <Route path="/problems/:id" element={<ProblemDetail />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
