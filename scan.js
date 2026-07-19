const fs = require('fs');
const content = fs.readFileSync('src/data/courses/gestionApprovisionnements.ts', 'utf8');

// Match `> "` or `> \n"` or any empty blockquote, including spaces and literal `\n` or `\\n`
const regex = />(\\s|\\\\n)*"/g;
let match;
let count = 0;
while ((match = regex.exec(content)) !== null) {
  count++;
  console.log('Suspicious block found at index:', match.index);
  console.log(content.substring(Math.max(0, match.index - 50), match.index + 50));
  console.log('---');
}

if (count === 0) console.log('Aucune omission trouvée après un scan approfondi !');
