import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'
import getExceptionBody from './exception_defaults.js'

export default class UniqueContraintException extends Exception {
  constructor(message: string = 'Unique constraint violation') {
    super(message, {
      status: 422,
      code: 'E_UNIQUE_CONSTRAINT',
    })
  }

  async handle(error: Exception, ctx: HttpContext) {
    const body = getExceptionBody(error)

    ctx.response.status(422).send(body)
  }
}
