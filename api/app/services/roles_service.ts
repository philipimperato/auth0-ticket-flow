import { inject } from '@adonisjs/core'
import type { RoleCreateDto } from '../dtos/role.js'
import Role from '#models/role'

@inject()
export default class RolesService {
  create(role: RoleCreateDto) {
    return Role.create(role)
  }
}
