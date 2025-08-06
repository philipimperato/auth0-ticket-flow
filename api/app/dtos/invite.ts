export type InviteUserDto = {
  clientName: string
  timezone: string
  email: string
  firstName: string
  lastName: string
  zipCode: string
}

export type CreateInviteDto = {
  authId: string
  email: string
  ticketUrl: string
  resendId: string
}
