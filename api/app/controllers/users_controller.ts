import type { HttpContext } from '@adonisjs/core/http'
import UserService from '#services/users_service'
import { inject } from '@adonisjs/core'
import { createUserValidator } from '#validators/user'
import User from '#models/user'

@inject()
export default class UsersController {
  constructor(public userService: UserService) {}

  async store({ request, response, auth }: HttpContext) {
    await auth.use('auth0').authenticate()

    const data = await request.validateUsing(createUserValidator)
    const invitedUser = await User.findByOrFail('auth_id', data.authId)

    if (!invitedUser) {
      return response.badRequest('User not found')
    }

    await invitedUser.merge({ email: data.email }).save()

    return response.json(invitedUser)
  }
}
