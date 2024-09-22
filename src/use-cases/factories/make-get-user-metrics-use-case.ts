import { GetUserMetricsUseCase } from '../get-user-metrics'
import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-checkin-repository'

export function makeGetUserMetricsUseCase() {
  const useCase = new GetUserMetricsUseCase(new PrismaCheckInRepository())
  return useCase
}
