/**
 *
 * Forums page
 *
 */
import { Flex, Stack } from '@chakra-ui/react';
import { Role } from '@prisma/client';
import { Forum, ForumWithSubforums } from 'src/components/Forum';
import Head from '../components/Head';
import { Loading } from '../components/Loading';
import { trpc } from '../utils/trpc';

const allForums = 'forum.all';

const Forums = () => {
  const { data, status } = trpc.useQuery([allForums]);

  // const { data } = trpc.budget.byUserId.useQuery({
  //   userId: userId || '',
  // });

  if (status === 'loading') return <Loading />;

  return (
    <Stack gap={2} overflow="scroll">
      <Head />
      <Flex direction="column">
        <Stack gap="8px" height="100%" flex={1}>
          {(data as ForumWithSubforums[])?.map((forum) => (
            <Forum key={forum.id} {...forum} />
          ))}
        </Stack>
      </Flex>
    </Stack>
  );
};

Forums.auth = true;
Forums.roles = [Role.USER, Role.ADMIN];
export default Forums;
