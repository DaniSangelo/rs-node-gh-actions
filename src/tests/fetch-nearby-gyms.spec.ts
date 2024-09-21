import { expect, beforeEach, describe, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from '@/use-cases/fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let fetchNearbyGymsUseCase: FetchNearbyGymsUseCase

describe('Fetch nearby gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'GYM-01 Near',
      description: 'GYM-01 Desc',
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await gymsRepository.create({
      title: 'GYM-02 Far',
      description: 'GYM-02 Desc',
      phone: null,
      latitude: -27.0610928,
      longitude: -49.5229501,
    })

    const { gyms } = await fetchNearbyGymsUseCase.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'GYM-01 Near' })])
  })
})
