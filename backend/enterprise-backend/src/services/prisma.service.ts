import { PrismaClient } from '@prisma/client'

class PrismaService {
  private client: PrismaClient

  constructor() {
    this.client = new PrismaClient()
  }

  public get() {
    return this.client
  }

  public async disconnect() {
    await this.client.$disconnect()
  }
}

export const prisma = new PrismaService().get()
export default prisma
