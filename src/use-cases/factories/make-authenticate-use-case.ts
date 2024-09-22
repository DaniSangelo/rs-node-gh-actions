import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const useCase = new AuthenticateUseCase(new PrismaUsersRepository())
  return useCase
}
