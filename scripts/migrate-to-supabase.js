// Run with: SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/migrate-to-supabase.js
const fs = require('fs')
const path = require('path')

async function main() {
  const SUPABASE_URL = process.env.SUPABASE_URL
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars')
    process.exit(1)
  }
  const { createClient } = require('@supabase/supabase-js')
  const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

  const problemsPath = path.resolve(__dirname, '../src/data/problems.json')
  const formulasPath = path.resolve(__dirname, '../src/data/formulas.json')

  const problems = JSON.parse(fs.readFileSync(problemsPath, 'utf8'))
  const formulas = JSON.parse(fs.readFileSync(formulasPath, 'utf8'))

  console.log(`Inserting ${problems.length} problems`)
  for (const chunk of chunkArray(problems, 100)) {
    const { error } = await sb.from('problems').insert(chunk)
    if (error) console.error('Insert error', error)
  }

  console.log(`Inserting ${formulas.length} formulas`)
  for (const chunk of chunkArray(formulas, 100)) {
    const { error } = await sb.from('formulas').insert(chunk)
    if (error) console.error('Insert error', error)
  }

  console.log('Migration complete')
}

function chunkArray(arr, size) {
  const out = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

main().catch((e) => { console.error(e); process.exit(1) })
