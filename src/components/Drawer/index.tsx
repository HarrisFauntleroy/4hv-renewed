import {
  Drawer as ChakraDrawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

interface DrawerProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
}

function Drawer({ children, onClose, isOpen }: DrawerProps) {
  return (
    <ChakraDrawer placement="right" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        {children}
      </DrawerContent>
    </ChakraDrawer>
  );
}

export default Drawer;
