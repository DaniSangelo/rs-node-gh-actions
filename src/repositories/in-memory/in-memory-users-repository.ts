import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password: data.password,
      created_at: new Date(),
    }
    this.items.push(user)
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)
    if (!user) return null
    return user
  }

  findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id)
    if (!user) return null
    return user
  }
}
