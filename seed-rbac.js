const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding roles and users for RBAC...');

  // 1. Create Roles
  const rolesData = [
    { code: 'ADMIN', name: 'Administrator' },
    { code: 'SDM', name: 'Sumber Daya Manusia (HR)' },
    { code: 'KEUANGAN', name: 'Bagian Keuangan' },
    { code: 'EMPLOYEE', name: 'Pegawai Biasa' },
  ];

  const roles = {};
  for (const r of rolesData) {
    roles[r.code] = await prisma.roles.upsert({
      where: { code: r.code },
      update: {},
      create: {
        code: r.code,
        name: r.name,
        is_system: true
      },
    });
  }
  console.log('Roles created/verified.');

  // 2. We need a default branch (for user_roles composite key)
  // Check if any branch exists
  let branch = await prisma.branches.findFirst();
  if (!branch) {
    branch = await prisma.branches.create({
      data: {
        code: 'HQ-01',
        name: 'Kantor Pusat'
      }
    });
    console.log('Default branch created.');
  }

  // 3. Create Users
  const hashedPassword = await bcrypt.hash('rahasia123', 10);
  const usersData = [
    { username: 'admin', email: 'admin@efarina.com', first: 'Admin', role: 'ADMIN' },
    { username: 'sdm', email: 'sdm@efarina.com', first: 'Staf', last: 'SDM', role: 'SDM' },
    { username: 'keuangan', email: 'keuangan@efarina.com', first: 'Staf', last: 'Keuangan', role: 'KEUANGAN' },
    { username: 'pegawai', email: 'pegawai@efarina.com', first: 'Pegawai', last: 'Biasa', role: 'EMPLOYEE' },
  ];

  for (const u of usersData) {
    const user = await prisma.users.upsert({
      where: { username: u.username },
      update: {},
      create: {
        first_name: u.first,
        last_name: u.last || null,
        username: u.username,
        email: u.email,
        password: hashedPassword,
      },
    });

    // Link user to role
    const roleId = roles[u.role].id;
    // user_roles uses composite id: [user_id, role_id, branch_id]
    await prisma.user_roles.upsert({
      where: {
        user_id_role_id_branch_id: {
          user_id: user.id,
          role_id: roleId,
          branch_id: branch.id
        }
      },
      update: {},
      create: {
        user_id: user.id,
        role_id: roleId,
        branch_id: branch.id
      }
    });
    console.log(`User ${u.username} with role ${u.role} created/verified.`);
  }

  console.log('Seeding RBAC completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
