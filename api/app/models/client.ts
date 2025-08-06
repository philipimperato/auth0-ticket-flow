import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'

export default class Client extends BaseModel {
  public static table = 'auth.clients'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare timezone: string

  @column()
  declare externalId: string

  @column()
  declare package: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  public static async buildSlug(client: Client) {
    if (client.name && !client.slug) {
      client.slug = client.name.trim().toLowerCase().replace(/\s+/g, '-')
    }
  }
}
