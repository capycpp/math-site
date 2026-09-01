import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 py-6 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} MathSite — Learn math beautifully.</p>
      </div>
    </footer>
  )
}
