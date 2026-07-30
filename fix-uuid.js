const { Client } = require('pg');
const client = new Client({ connectionString: 'postgresql://postgres:rahasia123@localhost:5434/presensi' });

client.connect()
  .then(() => client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'))
  .then(() => {
    console.log('Ekstensi uuid-ossp berhasil diaktifkan!');
    client.end();
  })
  .catch(err => {
    console.error('Koneksi Error:', err.message);
    process.exit(1);
  });
