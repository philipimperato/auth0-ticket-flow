import { Exception } from '@adonisjs/core/exceptions'

export interface ExceptionBody {
  code: string
  status: number
  error: {
    message: string
  }
}

export default function getExceptionBody(data: Exception): ExceptionBody {
  return {
    code: data.code || 'E_INTERNAL_ERROR',
    status: data.status || 500,
    error: {
      message: data.message || 'Internal server error',
    },
  }
}
