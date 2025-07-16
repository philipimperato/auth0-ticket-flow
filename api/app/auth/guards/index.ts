import Auth0UserProvider from '#auth/providers/auth0_user_provider'
import { Auth0Guard } from '#auth/guards/auth0'

export const guards = {
  auth0: {
    guard: Auth0Guard,
    provider: Auth0UserProvider,
  },
}
