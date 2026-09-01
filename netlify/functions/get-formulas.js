const fs = require('fs')
const path = require('path')

exports.handler = async function (event, context) {
  try {
    const SUPABASE_URL = process.env.SUPABASE_URL
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const { createClient } = require('@supabase/supabase-js')
        const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
        const { data, error } = await sb.from('formulas').select('*')
        if (error) {
          console.error('Supabase error:', error)
          return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Failed to load formulas from database' }),
          }
        }
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data }),
        }
      } catch (err) {
        console.error('Supabase query failed:', err)
        return {
          statusCode: 500,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Failed to load formulas (db)' }),
        }
      }
    }

    // fallback to JSON file
    const file = path.resolve(__dirname, '../../src/data/formulas.json')
    const raw = fs.readFileSync(file, 'utf8')
    const data = JSON.parse(raw)

    if (!Array.isArray(data)) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Formulas data is not an array' }),
      }
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    }
  } catch (err) {
    console.error('Error reading formulas data:', err)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to load formulas' }),
    }
  }
}
