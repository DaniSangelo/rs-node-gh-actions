import { app } from '@/app'
import { createAndAuthenticateuser } from '@/utils/tests/create-and-authenticate-user'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Nearby Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { accessToken } = await createAndAuthenticateuser(app, true)

    await request(app.server)
      .post('/gym')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'GYM-02 Far',
        description: 'GYM-02 Desc',
        phone: null,
        latitude: -27.0610928,
        longitude: -49.5229501,
      })

    await request(app.server)
      .post('/gym')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'GYM-01 Near',
        description: 'GYM-01 Desc',
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      })

    const response = await request(app.server)
      .get('/gym/nearby')
      .set('Authorization', `Bearer ${accessToken}`)
      .query({
        latitude: -27.2092052,
        longitude: -49.6401091,
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'GYM-01 Near',
      }),
    ])
  })
})
