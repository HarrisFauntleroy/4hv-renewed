import { StackProps } from '@chakra-ui/react';
import NextHead from 'next/head';
import { PropsWithChildren } from 'react';

interface HeadProps extends PropsWithChildren, StackProps {
  title?: string;
}

/**
 * Simple page wrapper
 * Can adjust the Stacks styles
 * Optional title
 */
export default function Head({ title }: HeadProps) {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </NextHead>
  );
}
