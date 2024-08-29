import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const registerUseCase = new AuthenticateUseCase(new PrismaUsersRepository())
  return registerUseCase
}
