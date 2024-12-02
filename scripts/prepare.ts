import path from 'node:path'
import fs from 'node:fs'
import dotenv from 'dotenv'
import { $ } from 'execa'

dotenv.config()

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

const filePath = './public/firebase-config.json'

const commandOptions = {
  stdio: 'inherit' as const,
};

(async function () {
  try {
    fs.writeFileSync(filePath, JSON.stringify(firebaseConfig, null, 2))
    console.log('Firebase config file written successfully')
  }
  catch (err) {
    console.error('Error writing to file:', err)
  }

  try {
    const isPosixSystem = process.platform === 'darwin' || process.platform === 'linux'

    const rootDir = path.resolve(__dirname, '..')

    const baseDir = isPosixSystem
      ? path.resolve(rootDir, './node_modules/@thecodeorigin/nuxt')
      : fs.readlinkSync(
        path.resolve(rootDir, './node_modules/@thecodeorigin/nuxt'),
      )

    const targetDir = path.resolve(rootDir, './areas')

    await $(commandOptions)`npx rimraf ${targetDir}`

    try {
      fs.mkdirSync(targetDir, { recursive: true })
    }
    catch {}

    await $(commandOptions)`nuxt prepare`

    fs.cpSync(
      path.resolve(baseDir, './server'),
      path.resolve(targetDir, './base/server'),
      { recursive: true },
    )
  }
  catch (error) {
    console.error(error)

    process.exit(1)
  }
})()
