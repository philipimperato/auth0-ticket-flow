import { inject } from '@adonisjs/core'
import User from '#models/user'
import type { UserCreateDto, UserUpdateDto } from '../dtos/user.js'
import { createUserValidator } from '#validators/user'
import Role from '#models/role'
import Client from '#models/client'

@inject()
export default class UserService {
  show(authId: string) {
    return User.findByOrFail('authId', authId)
  }

  findBy(filters: any) {
    return User.query().where(filters)
  }

  async create(user: UserCreateDto) {
    const role = await Role.findByOrFail('name', 'inviter')

    const client = await Client.create({
      name: 'Pure Life Ministries',
      externalId: crypto.randomUUID(),
    })

    const validated = await createUserValidator.validate({
      ...user,
      status: 'new',
      clientId: client.id,
      roleId: role.id,
      externalId: crypto.randomUUID(),
    })

    return User.create(validated)
  }

  async signUp(authId: string, updateDto: UserUpdateDto) {
    const _user = await this.show(authId)

    _user.merge(updateDto)

    return _user.save()
  }
}
