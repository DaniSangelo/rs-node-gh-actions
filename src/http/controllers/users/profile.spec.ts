import request from 'supertest'
import { app } from '@/app'
import { it, describe, expect, beforeAll, afterAll } from 'vitest'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a user profile', async () => {
    await request(app.server).post('/users').send({
      name: 'Jon Doe',
      email: 'jondoe@mail.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'jondoe@mail.com',
      password: '123456',
    })

    const { access_token } = authResponse.body
    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${access_token}`)
      .send()
    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'jondoe@mail.com',
      }),
    )
  })
})
