import request from 'supertest'
import { app } from '@/app'
import { it, describe, expect, beforeAll, afterAll } from 'vitest'

describe('Authenticate a user (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to Authenticate a user', async () => {
    await request(app.server).post('/user').send({
      name: 'Jon Doe',
      email: 'jondoe@mail.com',
      password: '123456',
    })

    const response = await request(app.server).post('/user/sessions').send({
      email: 'jondoe@mail.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        accessToken: expect.stringMatching(
          /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
        ),
      }),
    )
  })
})
