import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsException } from './errors/invalid-credentials-exception'

let usersRepository: InMemoryUsersRepository
let authenticateUseCase: AuthenticateUseCase

describe('Authenticate use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    authenticateUseCase = new AuthenticateUseCase(usersRepository)
  })
  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'Jon Doe',
      email: 'jon.doe@mail.com',
      password: await hash('123456', 6),
    })
    const { user } = await authenticateUseCase.execute({
      email: 'jon.doe@mail.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    expect(() =>
      authenticateUseCase.execute({
        email: 'jondoe@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsException)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'Jon Doe',
      email: 'jon.doe@mail.com',
      password: await hash('123456', 6),
    })
    expect(() =>
      authenticateUseCase.execute({
        email: 'jon.doe@mail.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsException)
  })
})
