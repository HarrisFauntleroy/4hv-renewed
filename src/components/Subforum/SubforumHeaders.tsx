import { Th, Thead, Tr } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

const TableHeader = ({ children }: PropsWithChildren) => (
  <Th
    fontFamily="verdana, tahoma, arial, helvetica, sans-serif"
    fontSize="10px"
    fontWeight="bold"
  >
    {children}
  </Th>
);

export const SubforumHeaders = () => {
  return (
    <Thead>
      <Tr padding="8px 0px 8px 4px">
        <TableHeader>Topic</TableHeader>
        <TableHeader>Starter</TableHeader>
        <TableHeader>Replies</TableHeader>
        <TableHeader>Views</TableHeader>
        <TableHeader>Last Post</TableHeader>
      </Tr>
    </Thead>
  );
};
