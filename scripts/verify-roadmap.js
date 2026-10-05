const fs = require('fs');
const path = require('path');

const ROADMAP_PATH = path.join(__dirname, '..', 'docs', 'product', 'ROADMAP.md');

function verifyRoadmap() {
  if (!fs.existsSync(ROADMAP_PATH)) {
    console.error('❌ ROADMAP.md not found');
    process.exit(1);
  }

  const content = fs.readFileSync(ROADMAP_PATH, 'utf-8');
  let missing = [];

  for (let i = 1; i <= 100; i++) {
    const prNumber = i.toString().padStart(2, '0');
    const regex = new RegExp(`PR ${prNumber} —`);
    if (!regex.test(content)) {
      missing.push(`PR ${prNumber}`);
    }
  }

  if (missing.length > 0) {
    console.error('❌ Roadmap validation failed. Missing entries:');
    missing.forEach(pr => console.error(`  - ${pr}`));
    process.exit(1);
  }

  console.log('✅ Roadmap integrity verified: All 100 PRs are documented.');
}

verifyRoadmap();
