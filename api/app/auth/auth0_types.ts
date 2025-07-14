import User from '#models/user'
import { symbols } from '@adonisjs/auth'

export interface Auth0Payload {
  sub: string
  aud: string | string[]
  iss: string
  exp: number
  iat: number
  [key: string]: any
}

export interface Auth0UserInfo {
  sub: string
  email: string
}

export type UserInfo = Pick<User, 'authId' | 'email'>

export type UserGuard = Pick<User, 'authId' | 'email'> &
  Partial<Pick<User, 'firstName' | 'lastName' | 'clientId'>>

export type JwtGuardUser<RealUser> = {
  getId(): string | number | BigInt
  getOriginal(): RealUser
}

export interface JwtUserProviderContract<RealUser> {
  [symbols.PROVIDER_REAL_USER]: RealUser

  findByToken(auth0Sub: string): Promise<JwtGuardUser<RealUser> | null>
  findByUserInfo(accessToken: string, userInfoUrl: string): Promise<JwtGuardUser<UserInfo> | null>
  createUserForGuard(user: RealUser): Promise<JwtGuardUser<RealUser>>
  createLocalUser(user: UserInfo): Promise<JwtGuardUser<User>>
}
