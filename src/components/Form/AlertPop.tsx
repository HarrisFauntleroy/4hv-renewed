import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';
import React from 'react';

interface AlertPopProps {
  message: string;
}

export const AlertPop = ({ message }: AlertPopProps) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>{message}</AlertTitle>
    </Alert>
  );
};
