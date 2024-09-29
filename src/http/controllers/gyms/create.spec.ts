import { app } from '@/app'
import { createAndAuthenticateuser } from '@/utils/tests/create-and-authenticate-user'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { accessToken } = await createAndAuthenticateuser(app, true)
    const response = await request(app.server)
      .post('/gym')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Mark I Gym',
        description: 'Desc Mark I Gym',
        latitude: 0,
        longitude: 0,
      })

    expect(response.statusCode).toEqual(201)
  })
})
