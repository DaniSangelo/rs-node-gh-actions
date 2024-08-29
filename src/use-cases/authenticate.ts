import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { InvalidCredentialsException } from './errors/invalid-credentials-exception'

interface AuthenticateUseCaseRequestDTO {
  email: string
  password: string
}

interface AuthenticateUseCaseResponseDTO {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequestDTO): Promise<AuthenticateUseCaseResponseDTO> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) throw new InvalidCredentialsException()
    const doesPasswordMatch = await bcrypt.compare(password, user.password)
    if (!doesPasswordMatch) throw new InvalidCredentialsException()
    return {
      user,
    }
  }
}
