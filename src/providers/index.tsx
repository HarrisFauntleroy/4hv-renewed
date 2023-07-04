import { ChakraProvider } from "../providers/chakra";
import { IntlProvider } from "../providers/intl";
import { PropsWithChildren } from "react";

export const AppContext = ({ children }: PropsWithChildren) => {
  return (
    <ChakraProvider>
      <IntlProvider>{children}</IntlProvider>
    </ChakraProvider>
  );
};
