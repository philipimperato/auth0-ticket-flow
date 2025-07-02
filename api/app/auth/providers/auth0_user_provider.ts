import { symbols, errors } from '@adonisjs/auth'
import type { JwtUserProviderContract, JwtGuardUser } from '#auth/auth0_types'
import User from '#models/user'
import Client from '#models/client'
import Role from '#models/role'

export class Auth0UserProvider implements JwtUserProviderContract<User> {
  declare [symbols.PROVIDER_REAL_USER]: User

  async findById(auth0Id: string): Promise<JwtGuardUser<User>> {
    let user = await User.findBy('auth_id', auth0Id)

    /*  the jwt has validated, will secure this later - possibly with 
        a jwt or guid from nuxt 3 */
    if (!user) {
      const role = await Role.findByOrFail('name', 'system')

      // Demo Client
      try {
        const client = await Client.create({
          name: 'Pure Life',
          externalId: crypto.randomUUID(),
        })
        const _user = await User.create({
          authId: auth0Id,
          email: `${auth0Id}@example.com`,
          externalId: crypto.randomUUID(),
          status: 'new',
          clientId: client.id,
          roleId: role.id,
        })

        user = _user
      } catch (error) {
        throw new errors.E_UNAUTHORIZED_ACCESS('User not authenticated', {
          guardDriverName: 'auth0',
        })
      }
    }

    return this.createUserForGuard(user)
  }

  async createUserForGuard(user: User): Promise<JwtGuardUser<User>> {
    return {
      getId: () => user.authId,
      getOriginal: () => user,
    }
  }
}
