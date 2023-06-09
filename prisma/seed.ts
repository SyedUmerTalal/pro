import { PlatePurpose, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const australia = await prisma.country.upsert({
    where: { code: 'AU' },
    update: {},
    create: {
      code: 'AU',
      name: 'Australia',
      cities: {
        createMany: {
          data: [
            {
              code: '00001',
              name: 'Melbourne',
            },
            {
              code: '00002',
              name: 'Sydney',
            },
            {
              code: '00003',
              name: 'Richmond',
            },
          ],
        },
      },
    },
  });

  const pakistan = await prisma.country.upsert({
    where: { code: 'PK' },
    update: {},
    create: {
      code: 'PK',
      name: 'Pakistan',
      cities: {
        createMany: {
          data: [
            {
              code: '00004',
              name: 'Karachi',
            },
            {
              code: '00005',
              name: 'Lahore',
            },
            {
              code: '00006',
              name: 'Islamabad',
            },
          ],
        },
      },
    },
  });

  const listingPlate = await prisma.plate.upsert({
    where: { combination: 'ABC-01' },
    update: {},
    create: {
      combination: 'ABC-01',
      askingPrice: 2500,
      purpose: PlatePurpose.LISTING,
      comments: 'fake listing plate',
      ListingPlate: {
        create: {
          isOpenForPrice: true,
        },
      },
      user: {
        connect: {
          username: 'dummyUser1ww23',
        },
      },
    },
  });

  const auctionPlate = await prisma.plate.upsert({
    where: { combination: 'XYZ-01' },
    update: {},
    create: {
      combination: 'XYZ-01',
      askingPrice: 3500,
      purpose: PlatePurpose.AUCTION,
      comments: 'fake auction plate',
      AuctionPlate: {
        create: {
          isReserve: true,
        },
      },
      user: {
        connect: {
          username: 'dummyUser123',
        },
      },
    },
  });

  console.log({ australia, pakistan, listingPlate, auctionPlate });
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
