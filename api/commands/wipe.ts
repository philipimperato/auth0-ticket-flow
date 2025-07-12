import { BaseCommand } from '@adonisjs/core/ace'
import { CommandOptions } from '@adonisjs/core/types/ace'
import db from '@adonisjs/lucid/services/db'

export default class Wipe extends BaseCommand {
  static commandName = 'wipe'
  static description = 'Drops schema "auth" and runs migration:fresh and db:seed'

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

      this.logger.info('Running migration:fresh...')
      await this.kernel.exec('migration:fresh', [])
      this.logger.success('Migrations completed')

      this.logger.info('Running db:seed...')
      await this.kernel.exec('db:seed', [])
      this.logger.success('Seeds completed')
    } catch (e) {
      throw e
    } finally {
      await db.manager.closeAll()
    }
  }
}
