import { rand, randAvatar, randCountryCode, randEmail, randFullName, randLanguage, randPhoneNumber } from '@ngneat/falso'
import type { InferSelectModel } from 'drizzle-orm'
import bcrypt from 'bcrypt'
import type { sysRoleTable } from '../schemas'
import { sysUserTable } from '../schemas'
import { db } from '../../../areas/base/server/utils/db'

export async function seedUsers(roles: InferSelectModel<typeof sysRoleTable>[]) {
  console.log('Seeding users...')

  const userRole = roles.find(role => role.name === 'User')

  const testUser = {
    email: 'test@gmail.com',
    password: await bcrypt.hash('%w7mj3zAEf^$DeyPb@K#', 10),
    role_id: userRole!.id,
  }

  const users = await Promise.all(Array.from({ length: 1 }).fill(null).map(
    async () => ({
      email: randEmail(),
      password: await bcrypt.hash('123456', 10),
      phone: randPhoneNumber(),
      full_name: randFullName(),
      language: randLanguage(),
      country: randCountryCode(),
      avatar_url: randAvatar(),
      city: '',
      postcode: '',
      address: '',
      organization: '',
      role_id: rand(roles).id,
    }),
  ))

  users[0].email = testUser.email
  users[0].password = testUser.password
  users[0].role_id = testUser.role_id

  return await db.insert(sysUserTable).values(users).returning()
}
