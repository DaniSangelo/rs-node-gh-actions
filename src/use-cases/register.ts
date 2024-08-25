import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { userAlreadyExistException } from './errors/user-already-exist-exception'
const SALT_ROUNDS = 6

interface RegisterUseCaseDTO {
  email: string
  name: string
  password: string
}

export class RegisterUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}
  async execute({ name, password, email }: RegisterUseCaseDTO) {
    const userAlreadyExist = await this.usersRepository.findByEmail(email)
    if (userAlreadyExist) throw new userAlreadyExistException()
    const passwordHash = await hash(password, SALT_ROUNDS)
    this.usersRepository.create({ name, email, password: passwordHash })
  }
}
