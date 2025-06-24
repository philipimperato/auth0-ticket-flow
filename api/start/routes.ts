import router from '@adonisjs/core/services/router'

router.resource('roles', () => import('#controllers/roles_controller'))
router.resource('users', () => import('#controllers/users_controller'))
