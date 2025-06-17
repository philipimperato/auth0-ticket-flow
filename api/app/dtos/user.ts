import User from '#models/user'

export type UserCreateDto = Pick<User, 'firstName' | 'lastName' | 'email' | 'authId'>
