import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { search } from './search'
import { nearby } from './nearby'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/', create)
  app.get('/', search)
  app.get('/nearby', nearby)
}
