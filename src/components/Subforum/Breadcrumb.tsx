import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Breadcrumb as ChakraBreadCrumb,
} from '@chakra-ui/react';
import { Subforum } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

interface BreadcrumbProps {
  subforum?: Subforum;
}

export const Breadcrumb = ({ subforum }: BreadcrumbProps) => {
  return (
    <ChakraBreadCrumb separator={<BreadcrumbSeparator>::</BreadcrumbSeparator>}>
      <BreadcrumbItem>
        <Link href="/" passHref>
          <BreadcrumbLink>4hv.org</BreadcrumbLink>
        </Link>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Link href="/forum" passHref>
          <BreadcrumbLink>Forums</BreadcrumbLink>
        </Link>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Link href={`/subforum/${subforum?.id}`} passHref>
          <BreadcrumbLink>{subforum?.title}</BreadcrumbLink>
        </Link>
      </BreadcrumbItem>
    </ChakraBreadCrumb>
  );
};
