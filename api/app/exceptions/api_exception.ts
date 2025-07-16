import { Exception } from '@adonisjs/core/exceptions'
import type { HttpContext } from '@adonisjs/core/http'

interface ApiExceptionBody {
  code: string
  status: number
  message: string
}

export default class ApiException extends Exception {
  constructor({ code, status, message }: ApiExceptionBody) {
    super(message, {
      code,
      status,
    })
  }

  public async handle(error: this, ctx: HttpContext) {
    ctx.logger.error('Auth0 Error:', new Error(error.message))

    return ctx.response.status(error.status).json({
      code: error.code,
      message: error.message,
    })
  }
}
