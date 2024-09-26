import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { expect, beforeEach, describe, it, vi, afterEach } from 'vitest'
import { CheckInUseCase } from '../checkin'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { randomUUID } from 'node:crypto'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceException } from '@/use-cases/exceptions/max-distance-exception'
import { MaxNumberOfCheckInsException } from '@/use-cases/exceptions/max-number-of-check-ins-exception'

let checkInRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let checkInUseCase: CheckInUseCase
let gymId: string

describe('CheckIn Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    checkInUseCase = new CheckInUseCase(checkInRepository, gymsRepository)
    gymId = randomUUID()
    await gymsRepository.create({
      id: gymId,
      title: 'Mark I GYM',
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    })
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))
    const { checkIn } = await checkInUseCase.execute({
      gymId,
      userId: '',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should not be able to check in twice on the same day', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))
    await checkInUseCase.execute({
      gymId,
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(() =>
      checkInUseCase.execute({
        gymId,
        userId: 'user-01',
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsException)
  })
  it('should be able to check in on different days', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))
    await checkInUseCase.execute({
      gymId,
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })
    vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0))
    const { checkIn } = await checkInUseCase.execute({
      gymId,
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should not be able to check in distant from the gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Mark I GYM',
      description: null,
      phone: null,
      latitude: new Decimal(-19.9600785),
      longitude: new Decimal(-43.9913397),
    })
    await expect(() =>
      checkInUseCase.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -19.9560106,
        userLongitude: -43.9963917,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceException)
  })
})
