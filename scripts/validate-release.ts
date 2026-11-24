import { readFileSync } from 'node:fs'

const tag = process.argv[2]
const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')) as { version?: string }
const semverTag = /^v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/

if (!tag || !semverTag.test(tag)) {
  console.error('Invalid release tag. Expected an annotated tag matching vMAJOR.MINOR.PATCH, for example v0.1.0.')
  process.exit(1)
}

const tagVersion = tag.slice(1)
if (packageJson.version !== tagVersion) {
  console.error(`Release tag ${tag} does not match package.json version ${packageJson.version ?? '(missing)'}.`)
  process.exit(1)
}

console.log(`Release tag valid: ${tag} matches package.json version ${packageJson.version}.`)
