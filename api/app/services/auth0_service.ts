import ApiException from '#exceptions/api_exception'
import env from '#start/env'
import string from '@adonisjs/core/helpers/string'

type Auth0User = {
  created_at: string
  email: string
  email_verified: boolean
  name: string
  nickname: string
  picture: string
  updated_at: string
  user_id: string
}

export default class Auth0Service {
  private baseUrl = `https://${env.get('AUTH0_DOMAIN')}`
  private clientId = env.get('AUTH0_CLIENT_ID')
  private clientSecret = env.get('AUTH0_CLIENT_SECRET')

  private async getManagementToken() {
    const response = await fetch(`${this.baseUrl}/oauth/token`, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: this.clientId!,
        client_secret: this.clientSecret!,
        audience: `${this.baseUrl}/api/v2/`,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to get Auth0 management token')
    }

    const data = (await response.json()) as any
    return data.access_token
  }

  async createUser(email: string): Promise<Auth0User> {
    const token = await this.getManagementToken()

    const userData = {
      email,
      email_verified: false,
      connection: 'Username-Password-Authentication',
      password: string.random(30),
    }

    const response = await fetch(`${this.baseUrl}/api/v2/users`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const error = (await response.json()) as any

      throw new ApiException({
        code: 'AUTH0_USER_EXISTS',
        status: 409,
        message: error.message,
      })
    }

    return response.json() as unknown as Auth0User
  }

  async sendTicket(auth0User: Auth0User) {
    const token = await this.getManagementToken()

    const ticketPayload: any = {
      ttl_sec: 60 * 5,
      mark_email_as_verified: false,
      includeEmailInRedirect: true,
      user_id: auth0User.user_id,
      result_url: 'http://localhost:5002',
    }

    const ticketResponse = await fetch(`${this.baseUrl}/api/v2/tickets/password-change`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketPayload),
    })

    if (!ticketResponse.ok) {
      const error = (await ticketResponse.json()) as any
      throw new Error(`Auth0 ticket creation failed: ${error.message}`)
    }

    return ticketResponse.json() as unknown as { ticket: string }
  }
}
