import User from '#models/user'
import type { UserUpdateDto } from '../dtos/user.js'

export default class UserService {
  show(authId: string) {
    return User.findByOrFail('authId', authId)
  }

  findBy(filters: any) {
    return User.query().where(filters)
  }

  async signUp(authId: string, updateDto: UserUpdateDto) {
    const _user = await this.show(authId)

    _user.merge(updateDto)

    return _user.save()
  }
}
