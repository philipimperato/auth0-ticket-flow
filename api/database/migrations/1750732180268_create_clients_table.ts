import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'auth.clients'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('name').notNullable()
      table.string('slug').unique().notNullable()
      table.string('package').nullable()
      table.string('timezone').nullable()

      table.uuid('external_id')

      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.raw('DROP TABLE IF EXISTS "auth"."clients" CASCADE')
  }
}
