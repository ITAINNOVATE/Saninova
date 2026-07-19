const cp = require('child_process');
const output = cp.execSync('git log -p').toString();
const lines = output.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('type="file"')) {
    console.log('Match:');
    for (let j = Math.max(0, i-20); j <= i; j++) {
      console.log(lines[j]);
    }
    break;
  }
}
