import type { Auth0UserInfo } from '#auth/auth0_types'

export default class Auth0Service {
  async getUserInfo(accessToken: string, userInfoUrl: string): Promise<Auth0UserInfo> {
    const response = await fetch(userInfoUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Auth0 API error: ${response.status}`)
    }

    return (await response.json()) as unknown as Auth0UserInfo
  }
}
