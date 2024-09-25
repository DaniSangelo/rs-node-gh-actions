import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create';
import { validate } from './validate';
import { history } from './history';
import { metrics } from './metrics';

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/gym/:gymId/check-in', create)
  app.get('/check-ins/history', history)
  app.patch('/check-ins/:checkinId/validate', validate)
  app.get('/check-ins/metrics', metrics)
}
