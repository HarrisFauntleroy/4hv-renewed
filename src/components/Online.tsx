import { Divider, Flex, List, ListItem } from '@chakra-ui/react';
import { User } from '@prisma/client';
import Image from 'next/image';
import { trpc } from '../utils/trpc';
import { Loading } from './Loading';

export const Online = () => {
  const { data: users, status } = trpc.useQuery(['user.online']);

  // const { data } = trpc.budget.byUserId.useQuery({
  //   userId: userId || '',
  // });

  if (status === 'loading') return <Loading />;

  return (
    <List>
      <ListItem>Guests: 0</ListItem>
      <ListItem>Members: 0</ListItem>
      <ListItem>Newest Member: 0</ListItem>
      <Divider />
      <ListItem>Online now</ListItem>

      {(users as User[])?.map((user) => (
        <ListItem key={user.id}>
          <Flex justify="left" align="center" gap={1}>
            <Image height="8px" width="8px" alt="" src="/images/bullet2.gif" />
            {user.name}
          </Flex>
        </ListItem>
      ))}
    </List>
  );
};
