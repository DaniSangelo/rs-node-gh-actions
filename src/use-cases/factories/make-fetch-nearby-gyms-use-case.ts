import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeFetchNearbyGymsUseCase() {
  const useCase = new FetchNearbyGymsUseCase(new PrismaGymsRepository())
  return useCase
}
