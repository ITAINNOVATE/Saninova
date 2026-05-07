const fs = require('fs');
const path = require('path');
const dir = 'c:/Users/HP/Desktop/ITA/SaniNova/src/components/home';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Add inline-block
  content = content.replace(/className=\"font-poppins text-xs font-bold text-accent tracking-widest uppercase border-b-2/g, 'className=\"inline-block font-poppins text-xs font-bold text-accent tracking-widest uppercase border-b-2');
  
  // Replace spacing
  content = content.replace(/<div className=\"space-y-3\">\s*<span className=\"inline-block font-poppins/g, '<div className=\"space-y-5\">\n              <span className=\"inline-block font-poppins');
  content = content.replace(/<div className=\"([^>]*?)space-y-4([^>]*?)\">\s*<span className=\"inline-block font-poppins/g, '<div className=\"$1space-y-6$2\">\n          <span className=\"inline-block font-poppins');

  // Also catch DirectorSection space-y-4
  content = content.replace(/<div className=\"space-y-4 text-center lg:text-left\">\s*<span className=\"inline-block px-4/g, '<div className=\"space-y-6 text-center lg:text-left\">\n              <span className=\"inline-block px-4');

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log('Updated ' + file);
  }
}
