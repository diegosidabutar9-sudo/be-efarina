const fs = require('fs');
const data = JSON.parse(fs.readFileSync('package.json', 'utf8'));
data.scripts['start:all'] = 'concurrently "yarn start:dev" "yarn start:dev:auth" "yarn start:dev:karyawan" "yarn start:dev:penjadwalan" "yarn start:dev:attendance" "yarn start:dev:payroll"';
fs.writeFileSync('package.json', JSON.stringify(data, null, 2));
