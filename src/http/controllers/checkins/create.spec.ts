import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateuser } from '@/utils/tests/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Create checkin (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('should be able to create a checkin', async () => {
    const { accessToken } = await createAndAuthenticateuser(app)
    const gym = await prisma.gym.create({
      data: {
        title: 'GYM-01 Near',
        description: 'GYM-01 Desc',
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    })

    const response = await request(app.server)
      .post(`/gym/${gym.id}/check-in`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        latitude: -27.2092052,
        longitude: -49.6401091,
      })

    expect(response.statusCode).toEqual(201)
  })
})
