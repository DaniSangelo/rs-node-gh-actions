import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredentialsException } from '@/use-cases/exceptions/invalid-credentials-exception'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)
  try {
    const authenticateUseCase = makeAuthenticateUseCase()
    await authenticateUseCase.execute({
      email,
      password,
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsException) {
      return reply.status(400).send({ message: error.message })
    }
  }
  return reply.status(200).send()
}
