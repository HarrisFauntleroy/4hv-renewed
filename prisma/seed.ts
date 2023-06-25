/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from '@prisma/client';

const userId = 'claony4v60003vdivkis6bkxd';

/** Chatting and Socializing */
const forumId1 = '3af45003-bd97-4a2e-868a-3102b16886c1';
/** Science and Technology */
const forumId2 = 'fbaec562-ac14-434e-8b3c-2f7aeb39a08b';
/** Site Discussion and Utilities */
const forumId3 = '52c19a9d-d57b-4c01-afe5-d3d83c30e116';

const custodian = {
  id: userId,
  name: 'Custodian',
};

const forums = [
  {
    id: forumId1,
    userId: userId,
    title: 'Chatting and Socializing',
    subforums: [
      {
        title: 'General Chatting',
        description:
          'Want to chat about something not covered by any of the other boards? This is the place to do it. Please remember that most of the site rules still apply here.',
        id: '657a760e-ef79-42b4-8fe8-c740cb1781d1',
        userId: userId,
        forumId: forumId1,
      },
      {
        title: 'Sale and Trade',
        description:
          'This board is for the sale and trade of items related to *any* area of science. You can sell items here, or announce an ebay, amazon, etc. auction.',
        id: 'e2d5b28a-bb81-480d-80ec-845f68b40481',
        userId: userId,
        forumId: forumId1,
      },
    ],
  },
  {
    id: forumId2,
    userId: userId,
    title: 'Science and Technology',
    subforums: [
      {
        title: 'General Science and Electronics',
        description:
          "This board is for anything that doesn't fit the categories below, but still falls under the realm of science or electronics.",
        id: '1c1aaee6-39c3-4696-bb47-80dd50286b67',
        userId: userId,
        forumId: forumId2,
      },
      {
        title: 'High Voltage',
        description:
          "Post here regarding high voltage. This includes Marx generators, cascades, flybacks, and more. Please use the 'Tesla coil' forum for Tesla coils.",
        id: 'a4c7071b-1488-400e-bf4c-4c340d5514fe',
        userId: userId,
        forumId: forumId2,
      },
      {
        title: 'Tesla Coils',
        description:
          'This is the dedicated Tesla coil board. If it has to do with Tesla coils, post it here. Air-cored resonant transformers only, please!',
        id: '9fa0efe7-8f45-45bd-ad6e-bda40ab0478b',
        userId: userId,
        forumId: forumId2,
      },
      {
        title: 'Electromagnetic Radiation',
        description:
          'This group of boards is for anything having to do with electromagnetic radiation. This would include RF energy, HERF, EMP, lighting, and optics.',
        id: 'eb83485d-ee22-4b6f-9566-2647e5f01c87',
        userId: userId,
        forumId: forumId2,
      },
      {
        title: 'Electromagnetic Projectile Accelerators',
        description:
          'This board is for devices that use electromagnetic energy to accelerate a projectile. Rail guns and coil guns welcome!',
        id: '944d0c59-30df-4d50-ad51-f06abb41b00d',
        userId: userId,
        forumId: forumId2,
      },
      {
        title: 'Chemistry',
        description:
          'Everything chemistry-related goes here, including pyrotechnics, endothermic and exothermic reactions, combustion, and decomposition. Note that illegal explosives are not an acceptable topic of discussion.',
        id: 'd6f52bf7-2d1b-405a-9622-ab0f09b93c2b',
        userId: userId,
        forumId: forumId2,
      },
      {
        title: 'Computer Science',
        description:
          'This is where to post everything computer-related, such as hardware, software, and programming. PICs and BASIC Stamps welcome!',
        id: '6878bc00-90aa-4385-b9b0-40a7af0ea0a5',
        userId: userId,
        forumId: forumId2,
      },
      {
        title: 'Projects',
        description:
          'This is a place where members can showcase their latest projects. Check here to see what new and exciting things our members have been working on!',
        id: '9ca2239f-a2f1-421e-8e3f-27337b4ffb3d',
        userId: userId,
        forumId: forumId2,
      },
    ],
  },
  {
    id: forumId3,
    userId: userId,
    title: 'Site Discussion and Utilities',
    subforums: [
      {
        title: 'HvWiki Discussion',
        description:
          'Discuss the HvWiki here. Coordinate your efforts with others, or point out interesting articles. If you have a question about the wiki, or would like to register, use this board.',
        id: '21bcd30b-07d0-48a3-805c-4b1c6adf9c35',
        userId: userId,
        forumId: forumId3,
      },
      {
        title: 'Attachments',
        description:
          "This is the place to post attachments that you'd like to include in other threads. Remember, images and files uploaded to this section are for use on the forum only!",
        id: '302d9e06-5124-4457-b6df-6200db22219a',
        userId: userId,
        forumId: forumId3,
      },
      {
        title: 'Suggestion Box',
        description:
          "Your opinion matters. No, really! If you would like to see something changed, or you just have a suggestion, post it here. We'll talk about it, and you just may change things for the better!",
        id: 'f61f74a1-4d29-4ee7-aec4-a77c8aef052b',
        userId: userId,
        forumId: forumId3,
      },
      {
        title: 'Archive Discussion',
        description:
          'This board is for pointing out good threads that are found in the archives, located at Link2 and Link2 Please remember, this board is for archive-related discussion only! For actual discussion of the topics, use one of the other boards.',
        id: '9588b994-124b-4cc1-96a4-32e095af292c',
        userId: userId,
        forumId: forumId3,
      },
    ],
  },
];

const prisma = new PrismaClient();
async function main() {
  const promises = await prisma.user
    .upsert({
      where: {
        id: custodian.id,
      },
      create: custodian,
      update: custodian,
    })
    .then(() =>
      forums.map(async (forum) =>
        prisma.forum
          .upsert({
            where: {
              id: forum.id,
            },
            create: {
              id: forum.id,
              userId: forum.userId,
              title: forum.title,
            },
            update: {
              id: forum.id,
              userId: forum.userId,
              title: forum.title,
            },
          })
          .then(() =>
            forum.subforums.map(async (subforum) => {
              await prisma.subforum.upsert({
                where: {
                  id: subforum.id,
                },
                create: {
                  id: subforum.id,
                  userId: subforum.userId,
                  forumId: forum.id,
                  title: subforum.title,
                  description: subforum.description,
                },
                update: {
                  id: subforum.id,
                  userId: subforum.userId,
                  forumId: forum.id,
                  title: subforum.title,
                  description: subforum.description,
                },
              });
            }),
          ),
      ),
    );
  const result = await Promise.all(promises);
  console.log(result);
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
