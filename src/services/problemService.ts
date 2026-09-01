import { api } from './api'
import { Problem, ApiResponse, ApiError } from '../types'

export async function getProblems(): Promise<Problem[]> {
  const res = await api.get<ApiResponse<Problem[]> | ApiError>('/.netlify/functions/get-problems')
  const data = res.data as ApiResponse<Problem[]>
  if (data && Array.isArray(data.data)) return data.data
  throw new Error((res.data as ApiError).error || 'Invalid problems response')
}
