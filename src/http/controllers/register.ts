import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

const SALT_ROUNDS = 6
export async function register(request: FastifyRequest, reply: FastifyReply) {
  const createUserSchema = z.object({
    name: z.string(),
    password: z.string().min(6),
    email: z.string().email(),
  })
  const userData = createUserSchema.parse(request.body)
  const userAlreadyExist = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  })
  if (userAlreadyExist) return reply.status(409).send()
  const passwordHash = await hash(userData.password, SALT_ROUNDS)
  await prisma.user.create({
    data: {
      password: passwordHash,
      email: userData.email,
      name: userData.name,
    },
  })
  return reply.status(201).send()
}
