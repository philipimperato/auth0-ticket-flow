import { errors, symbols } from '@adonisjs/auth'
import type { JwtUserProviderContract, JwtGuardUser, UserInfo, UserGuard } from '#auth/auth0_types'
import User from '#models/user'
import Auth0Service from '#auth/utils/auth0_service'
import Role from '#models/role'
import Client from '#models/client'
import { pick } from 'lodash'

export default class Auth0UserProvider implements JwtUserProviderContract<UserGuard> {
  declare [symbols.PROVIDER_REAL_USER]: UserGuard

  constructor() {}

  async findByToken(auth0Sub: string): Promise<JwtGuardUser<UserGuard> | null> {
    const user = await User.findBy('auth_id', auth0Sub)
    const _user = pick(user, ['authId', 'email', 'firstName', 'lastName']) as UserGuard

    return user ? this.createUserForGuard(_user) : null
  }

  async findByUserInfo(
    accessToken: string,
    userInfoUrl: string
  ): Promise<JwtGuardUser<UserGuard> | null> {
    const auth0Service = new Auth0Service()
    const auth0User = await auth0Service.getUserInfo(accessToken, userInfoUrl)

    return auth0User
      ? this.createUserForGuard({
          authId: auth0User.sub,
          email: auth0User.email,
        })
      : null
  }

  async createUserForGuard(user: UserGuard): Promise<JwtGuardUser<UserGuard>> {
    return {
      getId: () => user.authId,
      getOriginal: () => user,
    }
  }

  async createLocalUser(userInfo: UserInfo): Promise<JwtGuardUser<UserGuard>> {
    let _localUser: User | null = null

    const role = await Role.findByOrFail('name', 'inviter')

    const client = await Client.create({
      name: 'Pure Life Ministries',
      externalId: crypto.randomUUID(),
    })

    _localUser = await User.create({
      ...userInfo,
      status: 'new',
      clientId: client.id,
      roleId: role.id,
      externalId: crypto.randomUUID(),
    })

    if (!_localUser) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Failed to create local user', {
        guardDriverName: 'auth0',
      })
    } else {
      _localUser.merge({
        clientId: client.id,
      })
    }

    return this.createUserForGuard(_localUser)
  }
}
