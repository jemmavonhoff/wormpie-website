const fs = require('fs');
const path = require('path');

const photosDir = path.join(__dirname, '_photos');
const output = [];

if (fs.existsSync(photosDir)) {
  const files = fs.readdirSync(photosDir).filter(f => f.endsWith('.md'));
  files.forEach(file => {
    const content = fs.readFileSync(path.join(photosDir, file), 'utf8');
    const lines = content.split('\n');
    const entry = {};
    let inFrontMatter = false;
    for (const line of lines) {
      if (line.trim() === '---') { inFrontMatter = !inFrontMatter; continue; }
      if (inFrontMatter) {
        const [key, ...rest] = line.split(':');
        if (key && rest.length) {
          entry[key.trim()] = rest.join(':').trim().replace(/^["']|["']$/g, '');
        }
      }
    }
    if (entry.image) output.push(entry);
  });
}

fs.writeFileSync(
  path.join(__dirname, 'photos.json'),
  JSON.stringify(output, null, 2)
);
console.log('Built photos.json with', output.length, 'photos');
