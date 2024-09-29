import request from 'supertest'
import { FastifyInstance } from 'fastify'
import { Role } from '@prisma/client'

export async function createAndAuthenticateuser(
  app: FastifyInstance,
  isAdmin: boolean = false,
) {
  await request(app.server)
    .post('/user')
    .send({
      name: 'Jon Doe',
      email: 'jondoe@mail.com',
      password: '123456',
      role: isAdmin ? Role.ADMIN : Role.MEMBER,
    })

  const authResponse = await request(app.server).post('/user/sessions').send({
    email: 'jondoe@mail.com',
    password: '123456',
  })

  const { accessToken } = authResponse.body
  return { accessToken }
}
