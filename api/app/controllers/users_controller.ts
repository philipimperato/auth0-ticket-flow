import User from '#models/user'
import UserService from '#services/users_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsersController {
  constructor(public userService: UserService) {}

  async index({ request, response, auth }: HttpContext) {
    const sessionUser = auth.getUserOrFail()

    if (sessionUser?.signUp) {
      const user = await this.userService.signUp({
        authId: sessionUser.sub,
        email: sessionUser.email,
      })

      return response.json([user])
    } else {
      const filters = request.qs()
      const users = await this.userService.findBy(filters)

      return response.json(users)
    }
  }
}
