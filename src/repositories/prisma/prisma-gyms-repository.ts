import { Gym, Prisma } from '@prisma/client'
import { FindManyNearbyParamsDTO, GymsRepository } from '../gyms-repository'
import { prisma } from '@/lib/prisma'

export class PrismaGymsRepository implements GymsRepository {
  async findById(gymId: string) {
    return await prisma.gym.findUnique({
      where: {
        id: gymId,
      },
    })
  }

  async create(data: Prisma.GymCreateInput) {
    return await prisma.gym.create({
      data,
    })
  }

  async searchMany(query: string, page: number) {
    return await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })
  }

  async findManyNearby(params: FindManyNearbyParamsDTO) {
    const { latitude, longitude } = params
    const gyms = await prisma.$queryRaw<Gym[]>`
    SELECT * from gyms
    WHERE (6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `
    return gyms
  }
}
