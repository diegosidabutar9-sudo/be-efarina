const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding default admin user...');
  
  const hashedPassword = await bcrypt.hash('rahasia123', 10);
  
  const user = await prisma.users.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      first_name: 'Admin',
      last_name: 'Efarina',
      username: 'admin',
      email: 'admin@efarina.com',
      password: hashedPassword,
    },
  });

  console.log('Admin user created:', user.username);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
