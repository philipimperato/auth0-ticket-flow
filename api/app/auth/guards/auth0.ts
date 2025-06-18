// app/auth/guards/jwt_guard.ts
import { symbols, errors } from '@adonisjs/auth'
import type { HttpContext } from '@adonisjs/core/http'
import type { GuardContract } from '@adonisjs/auth/types'
import type { JwtUserProviderContract } from '#auth/auth0_types'
import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'

interface Auth0GuardOptions {
  domain: string
  audience: string
  algorithms?: string[]
  clockTolerance?: number
}

interface Auth0Payload {
  sub: string
  aud: string | string[]
  iss: string
  exp: number
  iat: number
  [key: string]: any
}

export class Auth0Guard<UserProvider extends JwtUserProviderContract<unknown>>
  implements GuardContract<UserProvider[typeof symbols.PROVIDER_REAL_USER]>
{
  declare [symbols.GUARD_KNOWN_EVENTS]: {}

  driverName: 'auth0' = 'auth0'
  authenticationAttempted = false
  isAuthenticated = false

  user?: UserProvider[typeof symbols.PROVIDER_REAL_USER]

  readonly #ctx: HttpContext
  readonly #userProvider: UserProvider
  readonly #options: Auth0GuardOptions
  #jwksClient: jwksClient.JwksClient

  constructor(ctx: HttpContext, userProvider: UserProvider, options: Auth0GuardOptions) {
    this.#ctx = ctx
    this.#userProvider = userProvider
    this.#options = {
      algorithms: ['RS256'],
      clockTolerance: 30,
      ...options,
    }

    this.#jwksClient = jwksClient({
      jwksUri: `https://${this.#options.domain}/.well-known/jwks.json`,
      cache: true,
      cacheMaxEntries: 5,
      cacheMaxAge: 600000, // 10 minutes
      rateLimit: true,
      jwksRequestsPerMinute: 5,
    })
  }

  async authenticate(): Promise<UserProvider[typeof symbols.PROVIDER_REAL_USER]> {
    if (this.authenticationAttempted) {
      return this.getUserOrFail()
    }

    this.authenticationAttempted = true

    try {
      const token = this.#extractToken()
      const payload = await this.#verifyToken(token)
      const user = await this.#findUser(payload.sub)

      this.user = user.getOriginal()
      this.isAuthenticated = true
      return this.getUserOrFail()
    } catch (error) {
      // Reset authentication state on failure
      this.user = undefined
      this.isAuthenticated = false
      throw error
    }
  }

  async check(): Promise<boolean> {
    try {
      await this.authenticate()
      return true
    } catch {
      return false
    }
  }

  getUserOrFail(): UserProvider[typeof symbols.PROVIDER_REAL_USER] {
    if (!this.user) {
      throw new errors.E_UNAUTHORIZED_ACCESS('User not authenticated', {
        guardDriverName: this.driverName,
      })
    }
    return this.user
  }

  getUser(): UserProvider[typeof symbols.PROVIDER_REAL_USER] | undefined {
    return this.user
  }

  async logout(): Promise<void> {
    this.user = undefined
    this.authenticationAttempted = false
    this.isAuthenticated = false
  }

  /**
   * Generate a JWT token for a given user
   * Note: This method would typically be implemented by a JWT provider
   * that can create tokens, but since we're using external JWT (Auth0, etc.)
   * this method is not applicable for verification-only guards
   */
  async generate(user: UserProvider[typeof symbols.PROVIDER_REAL_USER]): Promise<string> {
    throw new Error('Token generation not supported by JWT verification guard')
  }

  /**
   * Authenticate as client for testing purposes
   */
  async authenticateAsClient(user: UserProvider[typeof symbols.PROVIDER_REAL_USER]): Promise<any> {
    this.user = user
    this.isAuthenticated = true
    this.authenticationAttempted = true

    return {
      headers: {},
      user: user,
    }
  }

  /**
   * Extract JWT token from Authorization header
   */
  #extractToken(): string {
    const authHeader = this.#ctx.request.header('authorization')

    if (!authHeader) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Authorization header missing', {
        guardDriverName: this.driverName,
      })
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Invalid authorization header format', {
        guardDriverName: this.driverName,
      })
    }

    const token = authHeader.slice(7).trim() // Remove 'Bearer ' prefix

    if (!token) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Token missing from authorization header', {
        guardDriverName: this.driverName,
      })
    }

    return token
  }

  /**
   * Verify JWT token and return decoded payload
   */
  async #verifyToken(token: string): Promise<Auth0Payload> {
    return new Promise((resolve, reject) => {
      const getKey: jwt.GetPublicKeyOrSecret = (header, callback) => {
        if (!header.kid) {
          return callback(new Error('Token header missing key ID (kid)'), undefined)
        }

        this.#jwksClient.getSigningKey(header.kid, (err, key) => {
          if (err) {
            return callback(new Error(`Failed to get signing key: ${err.message}`), undefined)
          }
          callback(null, key?.getPublicKey())
        })
      }

      jwt.verify(
        token,
        getKey,
        {
          algorithms: this.#options.algorithms as jwt.Algorithm[],
          audience: this.#options.audience,
          issuer: `https://${this.#options.domain}/`,
          clockTolerance: this.#options.clockTolerance,
        },
        (err, decoded) => {
          if (err) {
            let errorMessage = 'Token verification failed'

            if (err.name === 'TokenExpiredError') {
              errorMessage = 'Token has expired'
            } else if (err.name === 'JsonWebTokenError') {
              errorMessage = 'Invalid token'
            } else if (err.name === 'NotBeforeError') {
              errorMessage = 'Token not active yet'
            }

            return reject(
              new errors.E_UNAUTHORIZED_ACCESS(errorMessage, {
                guardDriverName: this.driverName,
              })
            )
          }

          if (!decoded || typeof decoded !== 'object' || !('sub' in decoded)) {
            return reject(
              new errors.E_UNAUTHORIZED_ACCESS('Invalid token payload', {
                guardDriverName: this.driverName,
              })
            )
          }

          resolve(decoded as Auth0Payload)
        }
      )
    })
  }

  async #findUser(userId: string) {
    try {
      const providerUser = await this.#userProvider.findById(userId)

      if (!providerUser) {
        throw new errors.E_UNAUTHORIZED_ACCESS('User not found', {
          guardDriverName: this.driverName,
        })
      }

      return providerUser
    } catch (error) {
      if (error instanceof errors.E_UNAUTHORIZED_ACCESS) {
        throw error
      }

      throw new errors.E_UNAUTHORIZED_ACCESS('Failed to retrieve user', {
        guardDriverName: this.driverName,
      })
    }
  }
}
