import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class User extends BaseModel {
  public static table = 'auth.users'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare email: string

  @column()
  declare clientId: string

  @column()
  declare externalId: string

  /**
   * The current status of the user.
   *
   * - `new`: Created account on auth0, but not sign up flow
   * - `invited`: Invited by admin, but not accepted
   * - `active`: The user has accepted the invitation and is active.
   * - `inactive`: The user account is temporarily disabled.
   * - `archived`: The user is no longer in use and has been archived.
   */
  @column()
  declare status: 'new' | 'invited' | 'active' | 'inactive' | 'archived'

  @column()
  declare roleId: number | null

  @column()
  declare authId: string

  @column()
  declare invitedBy: number | null

  @column()
  declare invitedAt: DateTime | null

  @column.dateTime()
  declare lastLoginAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
