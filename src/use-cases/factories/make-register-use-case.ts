import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const registerUseCase = new RegisterUseCase(new PrismaUsersRepository())
  return registerUseCase
}
