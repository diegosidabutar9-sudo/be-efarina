const { PrismaClient } = require('@prisma/client-karyawan');
const prisma = new PrismaClient();
prisma.employees.findMany({include: {department: true, position: true}})
  .then(res => { console.log(JSON.stringify(res, null, 2)); prisma.$disconnect(); })
  .catch(e => { console.error(e); prisma.$disconnect(); });
