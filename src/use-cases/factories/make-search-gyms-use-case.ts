import { SearchGymsUseCase } from '../search-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeSearchGymsUseCase() {
  const useCase = new SearchGymsUseCase(new PrismaGymsRepository())
  return useCase
}
