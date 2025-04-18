"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    const adminPassword = await bcrypt.hash('Admin@2025', 10);
    await prisma.user.upsert({
        where: { email: 'admin@zenith.com' },
        update: {},
        create: {
            name: 'Administrateur',
            email: 'admin@zenith.com',
            password: adminPassword,
            role: 'admin',
            phone: '0600000000',
            status: 'active',
        },
    });
    const clientPassword = await bcrypt.hash('Client@2025', 10);
    await prisma.user.upsert({
        where: { email: 'client1@zenith.com' },
        update: {},
        create: {
            name: 'Client Test 1',
            email: 'client1@zenith.com',
            password: clientPassword,
            role: 'client',
            phone: '0611111111',
            status: 'active',
        },
    });
    await prisma.user.upsert({
        where: { email: 'client2@zenith.com' },
        update: {},
        create: {
            name: 'Client Test 2',
            email: 'client2@zenith.com',
            password: clientPassword,
            role: 'client',
            phone: '0622222222',
            status: 'active',
        },
    });
}
main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map