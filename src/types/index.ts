export type Formula = {
  id: string
  title: string
  latex: string
  explanation: string
  category: string
}

export type Problem = {
  id: string
  title: string
  question: string
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert'
  answer: string
  tags?: string[]
}

export type ProblemsApiResponse = Problem[]

export type ApiResponse<T> = {
  data: T
}

export type ApiError = {
  error: string
}
