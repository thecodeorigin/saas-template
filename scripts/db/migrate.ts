import { $ } from 'execa'

import 'dotenv/config'

const commandOptions = {
  stdio: 'inherit' as const,
};

(async function () {
  try {
    await $(commandOptions)`drizzle-kit generate`

    await $(commandOptions)`drizzle-kit migrate`
  }
  catch (error) {
    console.error(error)

    process.exit(1)
  }
})()
