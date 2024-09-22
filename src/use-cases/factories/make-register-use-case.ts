import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const useCase = new RegisterUseCase(new PrismaUsersRepository())
  return useCase
}
