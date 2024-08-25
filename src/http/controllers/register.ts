import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistException } from '@/use-cases/errors/user-already-exist-exception'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const createUserSchema = z.object({
    name: z.string(),
    password: z.string().min(6),
    email: z.string().email(),
  })
  const { name, email, password } = createUserSchema.parse(request.body)
  try {
    const registerUseCase = new RegisterUseCase(new PrismaUsersRepository())
    await registerUseCase.execute({ name, password, email })
    return reply.status(201).send()
  } catch (error) {
    if (error instanceof UserAlreadyExistException) {
      return reply.status(409).send({ message: error.message })
    }
    throw error
  }
}
