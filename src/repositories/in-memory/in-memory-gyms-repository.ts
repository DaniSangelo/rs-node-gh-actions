import { Gym } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []
  async findById(id: string) {
    const gym = this.items.find((gym) => id === gym.id)
    return gym || null
  }
}
