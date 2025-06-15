import db from '@adonisjs/lucid/services/db'

export default class UserService {
  private tableName: string = 'auth.users'

  insert() {
    return db
      .table(this.tableName)
      .insert({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        auth_id: '1234567890',
      })
      .returning('*')
  }
}
