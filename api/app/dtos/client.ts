import Client from '#models/client'

export type ClientCreateDto = Pick<Client, 'name' | 'timezone'>
