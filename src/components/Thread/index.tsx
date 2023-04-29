import { Flex, Td, Text, Tr } from '@chakra-ui/react';
import { User, type Thread as PrismaThread } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { CommentWithComments } from '../Comment';

export interface ThreadWithComments extends PrismaThread {
  user: User;
  comments: CommentWithComments[];
}

export const Thread = (thread: ThreadWithComments) => {
  return (
    <Tr background="#fefefe" height="46px">
      <Td border="2px solid #fff" padding="4px" bg="#e4eaf2" maxWidth="32px">
        <Flex gap={1} align="center">
          <Image height="22" width="22" alt="" src="/images/nonew.png" />

          <Link href={`/thread/${thread.id}`}>
            <Text
              textDecoration="underline"
              fontWeight="bold"
              fontSize="12px"
              color="#716d6d"
            >
              {thread.title}
            </Text>
          </Link>
        </Flex>
      </Td>
      <Td border="2px solid #fff" padding="4px" bg="#e4eaf2">
        {thread.user.name}
      </Td>
      <Td border="2px solid #fff" padding="4px" bg="#e4eaf2">
        {thread.comments.length}
      </Td>
      <Td border="2px solid #fff" padding="4px" bg="#e4eaf2">
        {0}
      </Td>
      <Td border="2px solid #fff" padding="4px" bg="#e4eaf2">
        {thread.updatedAt.toLocaleString()}
      </Td>
    </Tr>
  );
};
