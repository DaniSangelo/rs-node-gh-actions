import { app } from '@/app'
import { createAndAuthenticateuser } from '@/utils/tests/create-and-authenticate-user'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Search Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search for a gym', async () => {
    const { accessToken } = await createAndAuthenticateuser(app, true)

    for (let i = 1; i <= 5; i++) {
      await request(app.server)
        .post('/gym')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: `Mark I Gym-${i}`,
          description: 'Desc Mark I Gym',
          latitude: 0,
          longitude: 0,
        })
    }

    const response = await request(app.server)
      .get('/gym')
      .set('Authorization', `Bearer ${accessToken}`)
      .query({
        query: 'Mark I Gym-1',
        page: 1,
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Mark I Gym-1',
      }),
    ])
  })
})
