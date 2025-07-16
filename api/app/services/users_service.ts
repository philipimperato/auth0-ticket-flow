import User from '#models/user'
import type { UserCreateDto, UserUpdateDto } from '#dtos/user'

export default class UserService {
  show(authId: string) {
    return User.findByOrFail('authId', authId)
  }

  findBy(filters: any) {
    return User.query().where(filters)
  }

  async store(user: UserCreateDto) {
    return User.create(user)
  }

  async signUp(authId: string, updateDto: UserUpdateDto) {
    const _user = await this.show(authId)

    _user.merge(updateDto)

    return _user.save()
  }
}
