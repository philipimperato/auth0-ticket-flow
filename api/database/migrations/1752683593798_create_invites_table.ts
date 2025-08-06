import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'auth.invites'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('auth_id').notNullable()
      table.string('email').notNullable()
      table.string('ticket_url').notNullable()
      table.string('resend_id').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.raw('DROP TABLE IF EXISTS "auth"."invites" CASCADE')
  }
}
