import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { UserAlreadyExistException } from '@/use-cases/exceptions/user-already-exist-exception'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const createUserSchema = z.object({
    name: z.string(),
    password: z.string().min(6),
    email: z.string().email(),
  })
  const { name, email, password } = createUserSchema.parse(request.body)
  try {
    const registerUseCase = makeRegisterUseCase()
    await registerUseCase.execute({ name, password, email })
    return reply.status(201).send()
  } catch (error) {
    if (error instanceof UserAlreadyExistException) {
      return reply.status(409).send({ message: error.message })
    }
    throw error
  }
}
