import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface GetUserMetricsRequestDTO {
  userId: string
}

interface GetUserMetricsResponseDTO {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}
  async execute({
    userId,
  }: GetUserMetricsRequestDTO): Promise<GetUserMetricsResponseDTO> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)
    return { checkInsCount }
  }
}
