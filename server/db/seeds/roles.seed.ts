import { sysRoleTable } from '../schemas'
import { db } from '../../../areas/base/server/utils/db'

export async function seedRoles() {
  console.log('Seeding roles...')

  return await db.insert(sysRoleTable)
    .values([
      { name: 'Admin' },
      { name: 'User' },
      { name: 'Visitor' },
    ])
    .returning()
}
