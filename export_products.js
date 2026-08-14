const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.product.findMany().then(products => {
  console.log(JSON.stringify(products, null, 2));
  p.$disconnect();
}).catch(e => { console.error(e); p.$disconnect(); });