import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

router.resource('roles', () => import('#controllers/roles_controller'))
router
  .group(() => {
    router.patch('signup', '#controllers/users_controller.signUp')

    router.resource('users', () => import('#controllers/users_controller')).apiOnly()
  })
  .use(middleware.auth({ guards: ['auth0'] }))
