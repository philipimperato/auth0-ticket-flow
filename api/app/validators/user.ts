import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    authId: vine.string().trim(),
  })
)
