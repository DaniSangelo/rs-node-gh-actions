import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

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
    return reply.status(409).send({ message: error.message })
  }
}
