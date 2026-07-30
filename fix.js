const fs = require('fs');
let content = fs.readFileSync('f:/SKRIPSI/be-efarina/prisma/schema.prisma', 'utf8');
content = content.replace(/model \w+ \{[\s\S]*?\n\}/g, (match) => {
  if (match.includes('@@schema')) return match;
  return match.replace(/\n\}$/, '\n  @@schema(\"public\")\n}');
});
fs.writeFileSync('f:/SKRIPSI/be-efarina/prisma/schema.prisma', content);
console.log('Fixed schemas');
