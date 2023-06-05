import { ActionButton, Pages, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const header = await prisma.header.upsert({
    where: { id: 1 },
    update: {},
    create: {
      headerSiteIdentity: {
        create: {
          title: 'title',
          tag: 'tag',
          icon: 'icon',
          logo: 'logo',
        },
      },
      headerMenu: {
        create: {
          navigations: {
            createMany: {
              data: [
                {
                  name: Pages.HOME,
                  label: 'HOME',
                  url: 'https://www.signature.com/home',
                },
                {
                  name: Pages.ABOUT,
                  label: 'ABOUT',
                  url: 'https://www.signature.com/about',
                },
                {
                  name: Pages.FAQS,
                  label: 'FAQs',
                  url: 'https://www.signature.com/faq',
                },
                {
                  name: Pages.AUCTIONS,
                  label: 'AUCTIONS',
                  url: 'https://www.signature.com/auction',
                },
                {
                  name: Pages.RESULTS,
                  label: 'RESULTS',
                  url: 'https://www.signature.com/results',
                },
                {
                  name: Pages.SELL,
                  label: 'SELL',
                  url: 'https://www.signature.com/sell',
                },
                {
                  name: Pages.CONTACT_US,
                  label: 'CONTACT US',
                  url: 'https://www.signature.com/contact-us',
                },
              ],
            },
          },
          buttons: {
            createMany: {
              data: [
                {
                  name: ActionButton.SIGN_UP,
                  text: 'REGISTER',
                  url: 'https://www.signature.com/register',
                  isEnable: true,
                },
                {
                  name: ActionButton.LOGIN,
                  text: 'LOGIN',
                  url: 'https://www.signature.com/login',
                },
              ],
            },
          },
        },
      },
    },
  });

  console.log({ header });
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
