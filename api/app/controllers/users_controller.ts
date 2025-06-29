import type { HttpContext } from '@adonisjs/core/http'
import UserService from '#services/users_service'
import { inject } from '@adonisjs/core'
import { createUserValidator } from '#validators/user'

@inject()
export default class UsersController {
  constructor(public userService: UserService) {}

  async store({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(createUserValidator)
    await auth.use('auth0').authenticate()
    console.log(data);
    
    //const user = await this.userService.create(data)

    return response.json(data)
  }
}
