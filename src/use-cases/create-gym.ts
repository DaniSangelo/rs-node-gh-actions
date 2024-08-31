import { Gym, User } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface CreateGymUseCaseDTO {
  title: string
  description?: string | null
  phone?: string | null
  latitude: number
  longitude: number
}

interface GymResponseDTO {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}
  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseDTO): Promise<GymResponseDTO> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return { gym }
  }
}
