import User from '#models/user'

export type UserCreateDto = Pick<
  User,
  'email' | 'authId' | 'lastName' | 'firstName' | 'clientId' | 'roleId' | 'status'
>
export type UserUpdateDto = Pick<User, 'firstName' | 'lastName' | 'status'>
