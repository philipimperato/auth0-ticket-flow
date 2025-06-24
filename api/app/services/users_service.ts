import { inject } from '@adonisjs/core'
import type { UserCreateDto } from '../dtos/user.js'
import User from '#models/user'

@inject()
export default class UserService {
  create(user: UserCreateDto) {
    return User.create(user)
  }
}
