import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import UserService from '#services/users_service'
import ClientsService from '#services/clients_service'
import { inviteUserValidator } from '#validators/invite'
import { InviteUserDto } from '../dtos/invite.js'
import Auth0Service from '#services/auth0_service'
import EmailService from '#services/email_service'
import InvitesService from '#services/invites_service'

@inject()
export default class InvitesController {
  constructor(
    public userService: UserService,
    public clientsService: ClientsService,
    public auth0Service: Auth0Service,
    public emailService: EmailService,
    public invitesService: InvitesService
  ) {}

  async invite({ response, request }: HttpContext) {
    const body = request.body() as InviteUserDto
    const validated = await inviteUserValidator.validate(body)
    const user = await this.userService.findBy({ email: validated.email })

    if (user.length === 0) {
      // 1. Create user in Auth0 for sub
      const auth0User = await this.auth0Service.createUser(validated.email)

      // 2. Create Client to associate with user
      const client = await this.clientsService.store({
        name: validated.clientName,
        timezone: validated.timezone,
      })

      // 3. Create user in local database
      const localUser = await this.userService.store({
        email: validated.email,
        authId: auth0User.user_id,
        firstName: validated.firstName,
        lastName: validated.lastName,
        status: 'new',
        clientId: client.id,
        roleId: 1,
      })

      // 4. Send password reset email
      const ticket = await this.auth0Service.sendTicket(auth0User)

      const resendResponse = await this.emailService.send({
        to: 'philipimperato@gmail.com',
        subject: 'Password Reset',
        from: 'delivered@resend.dev',
        html: ticket.ticket,
      })

      if (!resendResponse) {
        return response.status(500).json({
          code: 'EMAIL_SEND_FAILED',
          error: 'Failed to send email',
        })
      }

      // 6. Keep local record of invites
      await this.invitesService.store({
        authId: auth0User.user_id,
        email: validated.email,
        ticketUrl: ticket.ticket,
        resendId: resendResponse.id,
      })

      return localUser
    } else {
      return response.status(409).json({
        code: 'USER_ALREADY_EXISTS',
        error: 'User already exists',
      })
    }
  }
}
