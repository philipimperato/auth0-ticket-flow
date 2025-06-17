import type { UserCreateDto } from '../dtos/user.js'
import User from '#models/user'

export default class UserService {
  create(user: UserCreateDto) {
    return User.create(user)
  }
}
