import { PrismaClient } from 'typamine-prisma-client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)
  
  // Seed Roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: {
      name: 'ADMIN',
    },
  })

  const userRole = await prisma.role.upsert({
    where: { name: 'USER' },
    update: {},
    create: {
      name: 'USER',
    },
  })

  // Seed Admin User
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@typamine.com' },
    update: {},
    create: {
      email: 'admin@typamine.com',
      name: 'Admin',
      password: adminPassword,
      roles: {
        connect: { id: adminRole.id }
      }
    },
  })

  console.log(`Created admin user with id: ${admin.id}`)
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
