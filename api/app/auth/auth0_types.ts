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

export interface Auth0UserInfo extends User {
  sub: string
  email: string
  signUp?: boolean
}

export type JwtGuardUser<RealUser> = {
  getId(): string | number | BigInt
  getOriginal(): RealUser
}

export interface JwtUserProviderContract<RealUser> {
  [symbols.PROVIDER_REAL_USER]: RealUser

  createUserForGuard(user: RealUser): Promise<JwtGuardUser<RealUser>>
  findByToken(auth0Sub: string): Promise<JwtGuardUser<RealUser> | null>
  findByUserInfo(accessToken: string, userInfoUrl: string): Promise<JwtGuardUser<RealUser> | null>
}
