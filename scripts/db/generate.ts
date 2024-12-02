import { $ } from 'execa'

import 'dotenv/config'

const commandOptions = {
  stdio: 'inherit' as const,
};

(async function () {
  try {
    await $(commandOptions)`drizzle-kit generate`
  }
  catch (error) {
    console.error(error)

    process.exit(1)
  }
})()
