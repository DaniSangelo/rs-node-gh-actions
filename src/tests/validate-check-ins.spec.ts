import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { expect, beforeEach, describe, it, vi, afterEach } from 'vitest'
import { ValidateCheckInUseCase } from '../use-cases/validate-check-in'
import { ResourceNotFoundException } from '@/use-cases/exceptions/resource-not-found-exception'

let checkInRepository: InMemoryCheckInsRepository
let validateCheckInUseCase: ValidateCheckInUseCase

describe('Validate checkin Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    validateCheckInUseCase = new ValidateCheckInUseCase(checkInRepository)
    // vi.useFakeTimers()
  })

  afterEach(() => {
    // vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await validateCheckInUseCase.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an nonexistent check-in', async () => {
    await expect(() =>
      validateCheckInUseCase.execute({ checkInId: 'mark-I' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundException)
  })
})
