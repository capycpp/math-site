import React from 'react'

export default function Home() {
  return (
    <div>
      <section className="py-12">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Learn Math Beautifully</h1>
          <p className="max-w-2xl mx-auto mb-6">
            Interactive lessons, practice problems, timed exams, and personalized
            progress tracking.
          </p>
          <div className="flex justify-center gap-4">
            <a href="/formulas" className="px-6 py-3 border rounded">
              Explore Formulas
            </a>
            <a href="/problems" className="px-6 py-3 border rounded">
              Practice Problems
            </a>
          </div>
        </div>
      </section>
      <section className="mt-8">
        <div className="container mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 glass rounded-lg">Feature 1</div>
          <div className="p-6 glass rounded-lg">Feature 2</div>
          <div className="p-6 glass rounded-lg">Feature 3</div>
        </div>
      </section>
    </div>
  )
}
