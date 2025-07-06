import vine from '@vinejs/vine'

export const signUpValidator = vine.compile(
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

export const patchUserValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    status: vine.enum(['new', 'invited', 'active', 'inactive', 'archived']),
  })
)
