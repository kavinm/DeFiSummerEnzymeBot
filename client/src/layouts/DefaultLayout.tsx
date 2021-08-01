import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { Sidebar, Topbar, Footer } from '../components/shared';

const DefaultLayout: React.FC<{ name: string }> = ({ children, name }) => {
  return (
    <Flex minHeight="100vh">
      <Sidebar />
      <Box minHeight="100vh" backgroundColor="accentSurface" w="calc(100vw - 230px)" position="relative" pb="4rem">
        <Topbar name={name} />
        {children}
        <Footer />
      </Box>
    </Flex>
  );
};

export default DefaultLayout;
