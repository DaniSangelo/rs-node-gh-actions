import { expect, beforeEach, describe, it } from 'vitest'
import { SearchGymsUseCase } from '@/use-cases/search-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let searchGymsUseCase: SearchGymsUseCase

describe('Search gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    searchGymsUseCase = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'GYM-01',
      description: 'GYM-01 Desc',
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await gymsRepository.create({
      title: 'GYM-02',
      description: 'GYM-02 Desc',
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })
    const { gyms } = await searchGymsUseCase.execute({
      query: 'GYM-01',
      page: 1,
    })
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'GYM-01' })])
  })

  it('should be able to search paginated gyms', async () => {
    for (let i = 0; i < 22; i++) {
      await gymsRepository.create({
        title: `GYM-${i + 1}`,
        description: 'GYM-01 Desc',
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      })
    }
    const { gyms } = await searchGymsUseCase.execute({
      query: 'GYM-',
      page: 2,
    })
    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'GYM-21' }),
      expect.objectContaining({ title: 'GYM-22' }),
    ])
  })
})
