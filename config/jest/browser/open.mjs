import { setup } from 'jest-environment-puppeteer'
import { downloadBrowser } from 'puppeteer/lib/esm/puppeteer/node/install.js'

import serverStart from '../server/start.mjs'

/**
 * Open browser
 *
 * @param {import('jest').Config} jestConfig - Jest config
 */
export default async function browserOpen (jestConfig) {
  const { maxWorkers } = jestConfig

  /**
   * Increase Node.js max listeners warning threshold by Jest --maxWorkers
   * Allows jest-puppeteer.config.js `browserPerWorker: true` to open multiple browsers
   */
  if (Number.isFinite(maxWorkers)) {
    process.setMaxListeners(1 + maxWorkers)
  }

  await downloadBrowser() // Download browser
  await serverStart() // Wait for web server
  await setup(jestConfig) // Open browser
}
