import axios from 'axios'

export const api = axios.create({ baseURL: '/' })

export async function fetchFormulas() {
  const r = await api.get('/.netlify/functions/get-formulas')
  return r.data
}

export async function fetchProblems() {
  const r = await api.get('/.netlify/functions/get-problems')
  return r.data
}
