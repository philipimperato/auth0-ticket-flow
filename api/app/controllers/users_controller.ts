import type { HttpContext } from '@adonisjs/core/http'
import UserService from '#services/users_service'
import { inject } from '@adonisjs/core'

@inject()
export default class UsersController {
  constructor(public userService: UserService) {}

  async create({ response }: HttpContext) {
    const user = await this.userService.insert()

    return response.json(user)
  }
}
