import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  const useCase = new GetUserProfileUseCase(new PrismaUsersRepository())
  return useCase
}
