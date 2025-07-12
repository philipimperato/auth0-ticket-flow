import { BaseCommand } from '@adonisjs/core/ace'
import { CommandOptions } from '@adonisjs/core/types/ace'
import db from '@adonisjs/lucid/services/db'

export default class AddAuth extends BaseCommand {
  static commandName = 'add_auth'
  static description = 'Drops schema "auth" and re-adds'

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    try {
      this.logger.info('Dropping schema: auth')
      await db.rawQuery('DROP SCHEMA IF EXISTS auth CASCADE')
      this.logger.success('Dropped schema: auth')

      this.logger.info('Creating schema: auth')
      await db.rawQuery('CREATE SCHEMA auth')
      this.logger.success('Created schema: auth')
    } catch (e) {
      throw e
    } finally {
      await db.manager.closeAll()
    }
  }
}
