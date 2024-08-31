import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundException } from './exceptions/resource-not-found-exception'

interface GetUserProfileRequestDTO {
  userId: string
}

interface GetUserProfileResponseDTO {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    userId,
  }: GetUserProfileRequestDTO): Promise<GetUserProfileResponseDTO> {
    const user = await this.usersRepository.findById(userId)
    if (!user) throw new ResourceNotFoundException()
    return { user }
  }
}
