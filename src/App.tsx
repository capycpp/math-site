import React from 'react'
import Router from './routes/Router'
import Header from './components/Header'
import Footer from './components/Footer'
import Container from './components/ui/Container'
import { ToastProvider } from './components/ToastProvider'

export default function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-8">
          <Container>
            <Router />
          </Container>
        </main>
        <Footer />
      </div>
    </ToastProvider>
  )
}
