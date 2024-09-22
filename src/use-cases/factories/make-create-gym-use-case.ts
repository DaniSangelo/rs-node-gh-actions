import { CreateGymUseCase } from '../create-gym'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeCreateGymUseCase() {
  const useCase = new CreateGymUseCase(new PrismaGymsRepository())
  return useCase
}
