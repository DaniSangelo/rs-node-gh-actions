import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { ResourceNotFoundException } from './exceptions/resource-not-found-exception'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { MaxDistanceException } from './exceptions/max-distance-exception'
import { MaxNumberOfCheckInsException } from './exceptions/max-number-of-check-ins-exception'

interface CheckInRequestDTO {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInResponseDTO {
  checkIn: CheckIn
}

export class CheckInUseCase {
  private MAX_DISTANCE_IN_KM = 0.1
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInRequestDTO): Promise<CheckInResponseDTO> {
    const gym = await this.gymsRepository.findById(gymId)
    if (!gym) throw new ResourceNotFoundException()
    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    if (distance > this.MAX_DISTANCE_IN_KM) throw new MaxDistanceException()
    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )
    if (checkInOnSameDate) throw new MaxNumberOfCheckInsException()
    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    })
    return { checkIn }
  }
}
