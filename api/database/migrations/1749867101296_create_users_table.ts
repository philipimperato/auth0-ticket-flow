import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'auth.users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('first_name')
      table.string('last_name')
      table.string('email').notNullable().unique()
      table.integer('client_id').unsigned().notNullable()

      table.uuid('external_id')

      table
        .enum('status', ['new', 'invited', 'active', 'inactive', 'archived'])
        .defaultTo('new')
        .notNullable()

      table.integer('role_id').unsigned().nullable()
      table.string('auth_id').notNullable()
      table.integer('invited_by').unsigned().nullable()
      table.timestamp('invited_at').nullable()
      table.timestamp('last_login_at').nullable()

      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.raw('DROP TABLE IF EXISTS "auth"."users" CASCADE')
  }
}
