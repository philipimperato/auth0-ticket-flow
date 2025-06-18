// app/auth/providers/auth0_user_provider.ts
import { symbols } from '@adonisjs/auth'
import type { JwtUserProviderContract, JwtGuardUser } from '#auth/auth0_types'
import User from '#models/user'

export class Auth0UserProvider implements JwtUserProviderContract<User> {
  declare [symbols.PROVIDER_REAL_USER]: User

  async findById(auth0Id: string): Promise<JwtGuardUser<User> | null> {
    const user = await User.findBy('auth_id', auth0Id)
    if (!user) return null

    return this.createUserForGuard(user)
  }

  async createUserForGuard(user: User): Promise<JwtGuardUser<User>> {
    return {
      getId: () => user.authId,
      getOriginal: () => user,
    }
  }
}
