import User from '#models/user'

export type UserCreateDto = Pick<User, 'email' | 'authId'>
export type UserUpdateDto = Pick<User, 'firstName' | 'lastName' | 'timezone' | 'status'>
