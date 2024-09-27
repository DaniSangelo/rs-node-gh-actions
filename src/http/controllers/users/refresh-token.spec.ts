import request from 'supertest'
import { app } from '@/app'
import { it, describe, expect, beforeAll, afterAll } from 'vitest'

describe('Refresh token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/user').send({
      name: 'Jon Doe',
      email: 'jondoe@mail.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/user/sessions').send({
      email: 'jondoe@mail.com',
      password: '123456',
    })
    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/user/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
      }),
    )
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
