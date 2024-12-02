import { seedRoles } from './roles.seed'
import { seedPermissions } from './permissions.seed'
import { seedUsers } from './users.seed'
import { seedUserShortcuts } from './user_shortcuts.seed'
import { seedFaqs } from './faqs.seed'

export async function seed() {
  try {
    const roles = await seedRoles()

    await seedPermissions(roles)

    const sysUsers = await seedUsers(roles)

    await seedUserShortcuts(sysUsers)

    // await seedNotifications(sysUsers)

    await seedFaqs()
  }
  catch (error: any) {
    console.error(error)
  }
}
