import { inject } from '@adonisjs/core'
import Client from '#models/client'

@inject()
export default class ClientsService {
  async update(id: number, selectedPlan: string) {
    const _client = await Client.findByOrFail('id', id)

    _client.merge({ package: selectedPlan })

    return _client.save()
  }
}
