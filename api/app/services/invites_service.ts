import { inject } from '@adonisjs/core'
import Invite from '#models/invite'
import { CreateInviteDto } from '#dtos/invite'

@inject()
export default class InvitesService {
  async store(invite: CreateInviteDto) {
    return Invite.create(invite)
  }
}
