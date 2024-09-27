import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { refreshToken } from './refresh-token'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', register)
  app.post('/sessions', authenticate)
  app.get('/me', { onRequest: [verifyJWT] }, profile)
  app.patch('/token/refresh', refreshToken)
}
