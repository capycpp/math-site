import React from 'react'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

const sample = [{ name: 'Mon', score: 60 }, { name: 'Tue', score: 70 }, { name: 'Wed', score: 85 }]

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 border rounded">Total solved: 42</div>
        <div className="p-4 border rounded">Accuracy: 78%</div>
        <div className="p-4 border rounded">Streak: 3 days</div>
      </div>
      <div className="mt-6 p-4 border rounded">
        <h3 className="font-semibold mb-2">Progress</h3>
        <div style={{ width: '100%', height: 200 }}>
          <ResponsiveContainer>
            <LineChart data={sample}>
              <Line type="monotone" dataKey="score" stroke="#6c5ce7" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
