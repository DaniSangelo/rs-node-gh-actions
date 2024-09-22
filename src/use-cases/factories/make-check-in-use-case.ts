import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckInUseCase } from '../checkin'
import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-checkin-repository'

export function makeCheckInUseCase() {
  const useCase = new CheckInUseCase(
    new PrismaCheckInRepository(),
    new PrismaGymsRepository(),
  )
  return useCase
}
