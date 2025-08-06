import { test } from '@japa/runner'
import { HttpContextFactory } from '@adonisjs/core/factories/http'
import { Auth0Guard } from '#auth/guards/auth0'
import Auth0UserProvider from '#auth/providers/auth0_user_provider'
import nock from 'nock'
import jwt from 'jsonwebtoken'
import { mockJwks } from '#tests/jwt-utils'

test.group('Auth0Guard', (group) => {
  let httpContext: any
  let userProvider: Auth0UserProvider
  let guard: Auth0Guard<Auth0UserProvider>

  const testConfig = {
    domain: 'test-domain.auth0.com',
    audience: 'test-audience',
    algorithms: ['RS256'],
  }

  group.each.setup(async () => {
    httpContext = new HttpContextFactory().create()
    httpContext.request.headers = {}
    httpContext.request.header = (name: string) => {
      return httpContext.request.headers[name.toLowerCase()]
    }
    userProvider = new Auth0UserProvider()
    guard = new Auth0Guard(httpContext, userProvider, testConfig)
  })

  test('should handle expired token', async ({ assert }) => {
    nock(`https://${testConfig.domain}`).get('/.well-known/jwks.json').reply(200, mockJwks)

    // Create an expired token (1 hour ago)
    const expiredPayload = {
      sub: 'auth0|test-user-id',
      aud: testConfig.audience,
      iss: `https://${testConfig.domain}/`,
      exp: Math.floor(Date.now() / 1000) - 3600,
      iat: Math.floor(Date.now() / 1000) - 7200,
    }

    const expiredToken = jwt.sign(expiredPayload, 'test-secret')

    httpContext.request.headers = {
      authorization: `Bearer ${expiredToken}`,
    }

    await assert.rejects(() => guard.authenticate())
  })

  test('should handle missing authorization header', async ({ assert }) => {
    httpContext.request.headers = {}

    await assert.rejects(() => guard.authenticate(), 'Authorization header missing')
  })

  test('should handle test authentication', async ({ assert }) => {
    const testUser = {
      id: 1,
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
    } as any

    const result = await guard.authenticateAsClient(testUser)

    assert.equal(guard.user, testUser)
    assert.isTrue(guard.isAuthenticated)
    assert.isTrue(guard.authenticationAttempted)
    assert.deepEqual(result.headers, {})
    assert.equal(result.user, testUser)
  })
})
