import { api } from './api'
import { Formula, ApiResponse, ApiError } from '../types'

export async function getFormulas(): Promise<Formula[]> {
  const res = await api.get<ApiResponse<Formula[]> | ApiError>('/.netlify/functions/get-formulas')
  const data = res.data as ApiResponse<Formula[]>
  if (data && Array.isArray(data.data)) return data.data
  throw new Error((res.data as ApiError).error || 'Invalid formulas response')
}
