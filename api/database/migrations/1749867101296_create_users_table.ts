import { BaseSchema } from '@adonisjs/lucid/schema'

class UserSchema extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.withSchema('auth').createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('first_name')
      table.string('last_name')
      table.string('email', 254).notNullable().unique()
      table.string('auth_id').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

export default UserSchema
