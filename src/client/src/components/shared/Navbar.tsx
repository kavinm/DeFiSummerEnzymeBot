import React from 'react';
import { Box } from '@chakra-ui/react';
import { Container, ThemedButton } from '../shared';
import { ReactComponent as EnzymeLogo } from '../../assets/logo/enzyme.svg';

const Navbar: React.FC = () => {
  return (
    <Box h="64px" borderBottom="1px solid" borderColor="accentOutlines">
      <Container display="flex" alignItems="center" justifyContent="space-between">
        <EnzymeLogo />
        <ThemedButton>Connect Wallet</ThemedButton>
      </Container>
    </Box>
  );
};

export default Navbar;
