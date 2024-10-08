import { UsersRepository } from '@/repositories/users-repository'
import bcrypt from 'bcryptjs'
import { UserAlreadyExistException } from './exceptions/user-already-exist-exception'
import { Role, User } from '@prisma/client'
const SALT_ROUNDS = 6

interface RegisterUseCaseDTO {
  email: string
  name: string
  password: string
  role?: Role
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
    role,
  }: RegisterUseCaseDTO): Promise<CreatedUserDTO> {
    const userAlreadyExist = await this.usersRepository.findByEmail(email)
    if (userAlreadyExist) throw new UserAlreadyExistException()
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      role,
    })
    return { user }
  }
}
