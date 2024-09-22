import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'
import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-checkin-repository'

export function makeFetchUserCheckInsUseCase() {
  const useCase = new FetchUserCheckInsHistoryUseCase(
    new PrismaCheckInRepository(),
  )
  return useCase
}
