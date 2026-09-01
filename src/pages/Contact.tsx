import React from 'react'

export default function Contact() {
  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Contact</h2>
      <form className="space-y-4">
        <div>
          <label className="block">Email</label>
          <input className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block">Message</label>
          <textarea className="w-full border p-2 rounded" rows={6} />
        </div>
        <button className="px-4 py-2 bg-primary-500 text-white rounded">Send</button>
      </form>
    </div>
  )
}
