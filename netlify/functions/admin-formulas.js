const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

function readFile() {
  const file = path.resolve(__dirname, '../../src/data/formulas.json')
  const raw = fs.readFileSync(file, 'utf8')
  return JSON.parse(raw)
}

function writeFile(data) {
  const file = path.resolve(__dirname, '../../src/data/formulas.json')
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8')
}

exports.handler = async function (event) {
  try {
    const auth = (event.headers && (event.headers.authorization || event.headers.Authorization)) || ''
    if (!auth.startsWith('Bearer ')) {
      return { statusCode: 401, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Unauthorized' }) }
    }
    const token = auth.split(' ')[1]
    try {
      const parts = token.split('.')
      if (parts.length >= 2) {
        const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'))
        const roles = (payload.user_metadata && payload.user_metadata.roles) || (payload.app_metadata && payload.app_metadata.roles) || []
        const isAdmin = Array.isArray(roles) ? roles.some((r) => String(r).toLowerCase() === 'admin') : false
        if (!isAdmin) {
          return { statusCode: 403, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Forbidden' }) }
        }
      } else {
        return { statusCode: 401, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Unauthorized' }) }
      }
    } catch (e) {
      console.error('Failed to parse token payload', e)
      return { statusCode: 401, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Unauthorized' }) }
    }
    if (event.httpMethod === 'GET') {
      const data = readFile()
      return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ data }) }
    }

    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body || '{}')
      const data = readFile()
      const item = { id: uuidv4(), ...body }
      data.push(item)
      writeFile(data)
      return { statusCode: 201, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ data: item }) }
    }

    return { statusCode: 405, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Method not allowed' }) }
  } catch (err) {
    console.error(err)
    return { statusCode: 500, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Server error' }) }
  }
}
