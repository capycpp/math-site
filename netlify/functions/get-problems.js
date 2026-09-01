const fs = require('fs')
const path = require('path')

exports.handler = async function (event, context) {
  try {
    const file = path.resolve(__dirname, '../../src/data/problems.json')
    const raw = fs.readFileSync(file, 'utf8')
    const data = JSON.parse(raw)

    if (!Array.isArray(data)) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Problems data is not an array' }),
      }
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    }
  } catch (err) {
    console.error('Error reading problems data:', err)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to load problems' }),
    }
  }
}
