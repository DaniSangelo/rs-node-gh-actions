import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchQuerySchema.parse(request.query)
  const searchQueryUseCase = makeSearchGymsUseCase()
  const { gyms } = await searchQueryUseCase.execute({ query, page })
  return reply.status(200).send({ gyms })
}
