import { ThreadWithComments } from '../Thread';
import { Link, Td, Text, Tr } from '@chakra-ui/react';
import { type Subforum as PrismaSubforum, User } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

export interface SubforumWithThreads extends PrismaSubforum {
  user: User;
  threads: ThreadWithComments[];
}

export const Subforum = (subforum: SubforumWithThreads) => {
  return (
    <Tr background="#fefefe" height="68px">
      <Td border="2px solid #fff" padding="4px" bg="#e4eaf2" maxWidth="32px">
        <Image height="22px" width="22px" alt="" src="/images/nonew.png" />
      </Td>
      <Td border="2px solid #fff" padding="4px" bg="#e4eaf2">
        <Link href={`/subforum/${subforum.id}`}>
          <Text
            textDecoration="underline"
            fontWeight="bold"
            fontSize="12px"
            color="#716d6d"
          >
            {subforum.title}
          </Text>
        </Link>
        <Text whiteSpace="pre-wrap" width="300px" fontSize="10px">
          {subforum.description}
        </Text>
      </Td>
      <Td>{subforum.threads.length}</Td>
      <Td>{subforum.threads.length}</Td>
      <Td>{subforum.threads.length}</Td>
    </Tr>
  );
};
