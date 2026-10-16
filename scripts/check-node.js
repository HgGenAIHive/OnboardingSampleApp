// Mirrors the strictest engine range in the lockfiles (Vite: ^20.19.0 || >=22.12.0).
const SUPPORTED = '^20.19.0 || >=22.12.0';

function isSupported(version) {
  const [major, minor] = version.split('.').map(Number);
  if (major === 20) return minor >= 19;
  if (major === 22) return minor >= 12;
  return major > 22;
}

if (require.main === module) {
  const version = process.versions.node;
  if (!isSupported(version)) {
    console.error(`Node.js ${SUPPORTED} is required, found ${version}. Install an LTS release from https://nodejs.org/`);
    process.exit(1);
  }
  console.log(`Node.js ${version} OK`);
}

module.exports = { isSupported };
