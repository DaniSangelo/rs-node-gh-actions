import { UsersRepository } from '@/repositories/users-repository'
import bcrypt from 'bcryptjs'
import { UserAlreadyExistException } from './exceptions/user-already-exist-exception'
import { User } from '@prisma/client'
const SALT_ROUNDS = 6

interface RegisterUseCaseDTO {
  email: string
  name: string
  password: string
}

interface CreatedUserDTO {
  user: User
}

export class RegisterUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}
  async execute({
    name,
    password,
    email,
  }: RegisterUseCaseDTO): Promise<CreatedUserDTO> {
    const userAlreadyExist = await this.usersRepository.findByEmail(email)
    if (userAlreadyExist) throw new UserAlreadyExistException()
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    })
    return { user }
  }
}
