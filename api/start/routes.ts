import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

router.resource('roles', () => import('#controllers/roles_controller'))
router
  .resource('users', () => import('#controllers/users_controller'))
  .use(
    '*',
    middleware.auth({
      guards: ['auth0'],
    })
  )
