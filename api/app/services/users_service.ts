import { inject } from '@adonisjs/core'
import User from '#models/user'
import type { UserCreateDto } from '../dtos/user.js'
import type { Auth0UserInfo } from '#auth/auth0_types'
import { signUpValidator } from '#validators/user'
import Role from '#models/role'
import Client from '#models/client'

@inject()
export default class UserService {
  create(user: UserCreateDto) {
    return User.create(user)
  }

  show(authId: string) {
    return User.findByOrFail('auth_id', authId)
  }

  findBy(filters: any) {
    return User.query().where(filters)
  }

  async signUp(user: Pick<Auth0UserInfo, 'authId' | 'email'>) {
    const role = await Role.findByOrFail('name', 'inviter')

    const client = await Client.create({
      name: 'Pure Life Ministries',
      externalId: crypto.randomUUID(),
    })

    const validated = await signUpValidator.validate({
      ...user,
      status: 'new',
      clientId: client.id,
      roleId: role.id,
      externalId: crypto.randomUUID(),
    })

    return User.create(validated)
  }
}
