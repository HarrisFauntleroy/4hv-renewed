import { Center, CircularProgress } from "@chakra-ui/react";
import React from "react";

export function Loading() {
  return (
    <Center
      position="fixed"
      minWidth="100vw"
      minHeight="100vh"
      background="transparent"
      top={0}
      left={0}
    >
      <CircularProgress isIndeterminate size="64px" thickness="8px" />
    </Center>
  );
}
