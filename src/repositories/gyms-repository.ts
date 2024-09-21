import { Prisma, Gym } from '@prisma/client'

export interface FindManyNearbyParamsDTO {
  latitude: number
  longitude: number
}

export interface GymsRepository {
  findById(gymId: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
  searchMany(query: string, page: number): Promise<Gym[]>
  findManyNearby(params: FindManyNearbyParamsDTO): Promise<Gym[]>
}
