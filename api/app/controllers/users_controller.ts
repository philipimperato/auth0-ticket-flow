import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import UserService from '#services/users_service'
import ClientsService from '#services/clients_service'
import { UserUpdateDto } from '../dtos/user.js'
import { signUpValidator } from '#validators/user'

@inject()
export default class UsersController {
  constructor(
    public userService: UserService,
    public clientsService: ClientsService
  ) {}

  async index({ request, response }: HttpContext) {
    const filters = request.qs()
    const users = await this.userService.findBy(filters)

    return response.json(users)
  }

  async signUp({ request, response, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const body = request.body() as UserUpdateDto & { selectedPlan: string }
    const { selectedPlan, ...signUpData } = body

    signUpData.status = 'active'

    const validated = await signUpValidator.validate(signUpData)
    const signedUp = await this.userService.signUp(user.authId, validated)

    await this.clientsService.update(user.clientId, selectedPlan)

    return response.json(signedUp)
  }
}
