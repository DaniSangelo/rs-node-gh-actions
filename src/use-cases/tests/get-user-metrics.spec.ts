import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from '@/use-cases/get-user-metrics'
import { beforeEach, describe, expect, it } from 'vitest'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let getUserMetricsUseCase: GetUserMetricsUseCase

describe('Get user metrics use case', () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    getUserMetricsUseCase = new GetUserMetricsUseCase(
      inMemoryCheckInsRepository,
    )
  })

  it('should be able to get check-ins count', async () => {
    await inMemoryCheckInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    await inMemoryCheckInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })
    const { checkInsCount } = await getUserMetricsUseCase.execute({
      userId: 'user-01',
    })
    expect(checkInsCount).toEqual(2)
  })
})
