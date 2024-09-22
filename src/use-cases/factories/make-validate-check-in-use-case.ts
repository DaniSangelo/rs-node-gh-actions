import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-checkin-repository'
import { ValidateCheckInUseCase } from '../validate-check-in'

export function makeValidateCheckInUseCase() {
  const useCase = new ValidateCheckInUseCase(new PrismaCheckInRepository())
  return useCase
}
