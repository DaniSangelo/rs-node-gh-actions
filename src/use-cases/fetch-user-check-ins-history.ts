import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

interface FetchUserCheckinsHistoryRequestDTO {
  userId: string
  page: number
}

interface FetchUserCheckinsHistoryResponseDTO {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}
  async execute({
    userId,
    page,
  }: FetchUserCheckinsHistoryRequestDTO): Promise<FetchUserCheckinsHistoryResponseDTO> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )
    return { checkIns }
  }
}
