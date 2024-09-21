import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface FetchNearbyGymsUseCaseDTO {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsResponseDTO {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}
  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsUseCaseDTO): Promise<FetchNearbyGymsResponseDTO> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })
    return { gyms }
  }
}
