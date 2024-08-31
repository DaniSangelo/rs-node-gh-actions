import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from '@/use-cases/create-gym'
import { randomUUID } from 'crypto'
import { beforeEach, expect, describe, it } from 'vitest'

let gymsRepository: InMemoryGymsRepository
let gymsUserCase: CreateGymUseCase

describe('Register use case', async () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    gymsUserCase = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await gymsUserCase.execute({
      title: 'Mark II Gym',
      latitude: 0,
      longitude: 0,
    })
    expect(gym.id).toEqual(expect.any(String))
  })
})
