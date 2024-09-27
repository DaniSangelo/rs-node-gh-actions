import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { search } from './search'
import { nearby } from './nearby'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/', { onRequest: [verifyUserRole('ADMIN')] }, create)
  app.get('/', search)
  app.get('/nearby', nearby)
}
