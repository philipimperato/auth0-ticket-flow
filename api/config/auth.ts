import { defineConfig } from '@adonisjs/auth'
import type { InferAuthenticators, InferAuthEvents, Authenticators } from '@adonisjs/auth/types'
import { Auth0Guard } from '#auth/guards/auth0'
import env from '#start/env'
import { Auth0UserProvider } from '#auth/providers/auth0_user_provider'

const authConfig = defineConfig({
  default: 'auth0',

  guards: {
    auth0: (ctx) => {
      const provider = new Auth0UserProvider()

      return new Auth0Guard(ctx, provider, {
        domain: env.get('AUTH0_DOMAIN')!,
        audience: env.get('AUTH0_AUDIENCE')!,
      })
    },
  },
})

export default authConfig

/**
 * Inferring types from the configured auth
 * guards.
 */
declare module '@adonisjs/auth/types' {
  export interface Authenticators extends InferAuthenticators<typeof authConfig> {}
}
declare module '@adonisjs/core/types' {
  interface EventsList extends InferAuthEvents<Authenticators> {}
}
