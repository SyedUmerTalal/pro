import { PlatePurpose, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
async function main() {
  //#region  Countries
  const australia = await prisma.country.upsert({
    where: { code: 'AU' },
    update: {},
    create: {
      code: 'AU',
      name: 'Australia',
    },
  });

  const pakistan = await prisma.country.upsert({
    where: { code: 'PK' },
    update: {},
    create: {
      code: 'PK',
      name: 'Pakistan',
    },
  });
  //#endregion

  //#region  Cities

  const melbourne = await prisma.city.upsert({
    where: { code: '00001' },
    update: {},
    create: {
      code: '00001',
      name: 'Melbourne',
      country: {
        connect: {
          code: australia.code,
        },
      },
    },
  });

  const sydney = await prisma.city.upsert({
    where: { code: '00002' },
    update: {},
    create: {
      code: '00002',
      name: 'Sydney',
      country: {
        connect: {
          code: australia.code,
        },
      },
    },
  });

  const richmond = await prisma.city.upsert({
    where: { code: '00003' },
    update: {},
    create: {
      code: '00003',
      name: 'Richmond',
      country: {
        connect: {
          code: australia.code,
        },
      },
    },
  });

  const karachi = await prisma.city.upsert({
    where: { code: '00004' },
    update: {},
    create: {
      code: '00004',
      name: 'Karachi',
      country: {
        connect: {
          code: pakistan.code,
        },
      },
    },
  });

  const lahore = await prisma.city.upsert({
    where: { code: '00005' },
    update: {},
    create: {
      code: '00005',
      name: 'Lahore',
      country: {
        connect: {
          code: pakistan.code,
        },
      },
    },
  });

  const islamabad = await prisma.city.upsert({
    where: { code: '00006' },
    update: {},
    create: {
      code: '00006',
      name: 'Islamabad',
      country: {
        connect: {
          code: pakistan.code,
        },
      },
    },
  });

  //#endregion

  //#region Users
  const armaghan = await prisma.user.upsert({
    where: { username: 'sarmaghan' },
    update: {},
    create: {
      email: 'syed.armaghan@Kdyslab.com',
      firstName: 'Syed',
      lastName: 'Armaghan',
      password: bcrypt.hashSync('secret@kdys', 10),
      phoneNumber: '03152708208',
      postCode: '75900',
      state: 'Sindh',
      streetAddress: '45-N-1 BL-6',
      username: 'sarmaghan',
      city: {
        connect: {
          code: melbourne.code,
        },
      },
      country: {
        connect: {
          code: australia.code,
        },
      },
      companyName: 'KDys Lab',
    },
  });

  const umer = await prisma.user.upsert({
    where: { username: 'umerbukhari' },
    update: {},
    create: {
      email: 'umer.bukhari@Kdyslab.com',
      firstName: 'Umer',
      lastName: 'Bukhari',
      password: bcrypt.hashSync('secret@kdys', 10),
      phoneNumber: '03242422072',
      postCode: '75900',
      state: 'Sindh',
      streetAddress: '45-N-1 BL-6',
      username: 'umerbukhari',
      city: {
        connect: {
          code: karachi.code,
        },
      },
      country: {
        connect: {
          code: pakistan.code,
        },
      },
      companyName: 'Begintech',
    },
  });
  //#endregion

  console.log('DB seed successfull.');
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
