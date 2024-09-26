import request from 'supertest'
import { FastifyInstance } from 'fastify'

export async function createAndAuthenticateuser(app: FastifyInstance) {
  await request(app.server).post('/user').send({
    name: 'Jon Doe',
    email: 'jondoe@mail.com',
    password: '123456',
  })

  const authResponse = await request(app.server).post('/user/sessions').send({
    email: 'jondoe@mail.com',
    password: '123456',
  })

  const { accessToken } = authResponse.body
  return { accessToken }
}
