import request from 'supertest'
import { app } from '@/app'
import { it, describe, expect, beforeAll, afterAll } from 'vitest'

describe('Register a user (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a new user', async () => {
    const response = await request(app.server).post('/user').send({
      name: 'Jon Doe',
      email: 'jondoe@mail.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
