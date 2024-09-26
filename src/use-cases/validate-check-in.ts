import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { ResourceNotFoundException } from './exceptions/resource-not-found-exception'
import dayjs from 'dayjs'
import { LateCheckInValidationException } from './exceptions/late-check-in-validation-exception'

interface ValidateCheckInRequestDTO {
  checkInId: string
}

interface ValidateCheckInResponseDTO {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInRequestDTO): Promise<ValidateCheckInResponseDTO> {
    const checkIn = await this.checkInsRepository.findById(checkInId)
    if (!checkIn) throw new ResourceNotFoundException()
    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )
    if (distanceInMinutesFromCheckInCreation > 20)
      throw new LateCheckInValidationException()
    checkIn.validated_at = new Date()
    await this.checkInsRepository.save(checkIn)
    return { checkIn }
  }
}
