import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import { Environment } from 'vitest'
import { execSync } from 'node:child_process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL)
    throw new Error('Please, provide a DATABASE_URL environment variable')

  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)
  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    const schema = randomUUID()
    const dbUrl = generateDatabaseURL(schema)
    try {
      console.log('Generated DB URL:', dbUrl)
      process.env.DATABASE_URL = dbUrl
      execSync('npx prisma migrate deploy')
    } catch (error) {
      await prisma.$disconnect()
      console.error('Error while running migrations:', error.message);
      console.error('Stack trace:', error.stack);
    }

    return {
      async teardown() {
        try {
          console.log('Destruindo database')
          await prisma.$executeRawUnsafe(
            `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
          )
        } catch (error) {
          console.error('Error during teardown:', error)
        } finally {
          await prisma.$disconnect()
        }
      },
      transformMode: 'ssr',
    }
  },
}
