import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { describe, expect, it, beforeEach } from 'vitest'
import { GetUserProfileUseCase } from '../use-cases/get-user-profile'
import { hash } from 'bcryptjs'
import { ResourceNotFoundException } from '../use-cases/exceptions/resource-not-found-exception'

let usersRepository: InMemoryUsersRepository
let getUserProfileUseCase: GetUserProfileUseCase

describe('Get User Profile use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'jon.doe@mail.com',
      password: await hash('123456', 6),
    })
    const { user } = await getUserProfileUseCase.execute({
      userId: createdUser.id,
    })
    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      getUserProfileUseCase.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundException)
  })
})
