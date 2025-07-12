import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    authId: vine
      .string()
      .trim()
      .regex(/^[a-zA-Z0-9|_-]+$/),
    email: vine.string().trim().email().normalizeEmail(),
    status: vine.enum(['new']),
    clientId: vine.number(),
    roleId: vine.number(),
    externalId: vine.string().trim(),
  })
)

export const signUpValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim(),
    lastName: vine.string().trim(),
    timezone: vine.string().trim(),
    status: vine.enum(['active']),
  })
)
