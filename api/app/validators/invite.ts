import v from '@vinejs/vine'

export const inviteUserValidator = v.compile(
  v.object({
    clientName: v.string(),
    timezone: v.string(),
    email: v.string().email(),
    firstName: v.string(),
    lastName: v.string(),
    zipCode: v.string().regex(/^\d{5}$/),
  })
)
