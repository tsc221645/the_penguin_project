import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const dist = join(process.cwd(), 'dist')
const requiredFiles = ['index.html']
const missing = requiredFiles.filter((file) => !existsSync(join(dist, file)))

if (missing.length) {
  console.error(`Smoke test failed. Missing build files: ${missing.join(', ')}`)
  process.exit(1)
}

const html = readFileSync(join(dist, 'index.html'), 'utf8')
if (!html.includes('<script type="module"')) {
  console.error('Smoke test failed. Production entry script is missing from dist/index.html')
  process.exit(1)
}

console.log(`Smoke test passed: ${requiredFiles.length} required build files and production entry found.`)
