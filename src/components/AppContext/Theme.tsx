import { theme } from '../../theme';
import { GlobalStyle, ChakraProvider as Provider } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

export default function ChakraProvider({ children }: PropsWithChildren) {
  return (
    <Provider theme={theme}>
      <GlobalStyle />
      {children}
    </Provider>
  );
}
