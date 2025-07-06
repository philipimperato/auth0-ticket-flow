import { symbols } from '@adonisjs/auth'
import type { JwtUserProviderContract, JwtGuardUser } from '#auth/auth0_types'
import User from '#models/user'
import Auth0Service from '#auth/utils/auth0_service'

export class Auth0UserProvider implements JwtUserProviderContract<User> {
  declare [symbols.PROVIDER_REAL_USER]: User

  async findByToken(auth0Sub: string): Promise<JwtGuardUser<User> | null> {
    let user = await User.findBy('auth_id', auth0Sub)

    return user ? this.createUserForGuard(user) : null
  }

  async findByUserInfo(
    accessToken: string,
    userInfoUrl: string
  ): Promise<JwtGuardUser<User> | null> {
    const auth0Service = new Auth0Service()
    const auth0User = await auth0Service.getUserInfo(accessToken, userInfoUrl)

    return auth0User ? this.createUserForGuard(auth0User) : null
  }

  async createUserForGuard(user: User): Promise<JwtGuardUser<User>> {
    return {
      getId: () => user.authId,
      getOriginal: () => user,
    }
  }
}
