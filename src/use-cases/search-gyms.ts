import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface SearchGymsUseCaseDTO {
  query: string
  page: number
}

interface SearchGymsResponseDTO {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}
  async execute({
    query,
    page,
  }: SearchGymsUseCaseDTO): Promise<SearchGymsResponseDTO> {
    const gyms = await this.gymsRepository.searchMany(query, page)
    return { gyms }
  }
}
