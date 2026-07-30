const { Client } = require('pg');
const client = new Client({ connectionString: 'postgresql://postgres:rahasia123@localhost:5434/presensi' });

client.connect()
  .then(() => client.query("SELECT table_schema, table_name FROM information_schema.tables WHERE table_schema IN ('attendance', 'payroll');"))
  .then(res => {
    console.log('--- Hasil Cek Database ---');
    if (res.rows.length === 0) {
      console.log('Tabel belum ada. Anda harus menjalankan prisma db push.');
    } else {
      res.rows.forEach(row => console.log(row.table_schema + '.' + row.table_name));
    }
    client.end();
  })
  .catch(err => {
    console.error('Koneksi Error:', err.message);
    process.exit(1);
  });
