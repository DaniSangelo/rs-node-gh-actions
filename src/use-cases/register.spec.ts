import { beforeEach, expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistException } from './errors/user-already-exist-exception'

let usersRepository: InMemoryUsersRepository
let registerUseCase: RegisterUseCase

describe('Register use case', async () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    registerUseCase = new RegisterUseCase(usersRepository)
  })

  it('should be able to register an user', async () => {
    const { user } = await registerUseCase.execute({
      name: 'Jon Doe',
      email: 'jon.doe@mail.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await registerUseCase.execute({
      name: 'Jon Doe',
      email: 'jon.doe@mail.com',
      password: '123456',
    })
    const isPasswordCorrectlyHashed = await compare('123456', user.password)
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register the same email twice', async () => {
    const email = 'jon.doe@mail.com'
    const { user } = await registerUseCase.execute({
      name: 'Jon Doe',
      email,
      password: '123456',
    })
    await expect(() =>
      registerUseCase.execute({
        name: 'Jon Doe 2',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistException)
    const isPasswordCorrectlyHashed = await compare('123456', user.password)
    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
