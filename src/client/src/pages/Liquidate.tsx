import React from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import { Box, Text,Flex,Center,Select} from '@chakra-ui/react';
import { ThemedButton, ThemedInput,Table } from '../components/shared';
import uuid from 'react-uuid';
import styled from '@emotion/styled';

const StyledSelect = styled(Select)`
  & {
    color: white;
    option {
      color: black !important;
    }
  }
`;

const vaultHoldingsRows = [
  {
    id: uuid(),
    asset: 'AXS',
    balance: 50.1,
    allocation: 14073.4836,
    price: 1990.16,
  },
  {
    id: uuid(),
    asset: 'steCRV-gauge',
    balance: 49.9,
    allocation: 13783.5404,
    price: 2024.08,
  },
];

const Liquidate: React.FC = () => {
  return <DefaultLayout name="Liquidate">
    
    <Flex>
    <Box backgroundColor="accentSurface"
        border="1px solid"
        borderColor="accentOutlines"
        padding="10px"
        borderRadius="8px"
        w="850px"
        mt={{ base: '4rem', xl: '2.5rem' }}
        mx={{ base: '1rem', sm: '1.5rem' }}>
    <form> 
    <Text
            as="label"
            htmlFor="vaultAddress"
            fontSize="lg"
            fontWeight="medium"
            color="gray.300"
            lineHeight="1.25rem"
          >
            ERC Token
          </Text>     
          <StyledSelect id="ercToken" color="gray.600" mt="0.25rem" borderColor="gray.600">
            <option>MLN</option>
            <option>UNI</option>
            <option>AXS</option>
            <option>WETH</option>
          </StyledSelect>
  <Text as="span" color="error" display="block" h="2rem">
    {/* {errors.vaultAddress?.message} */}
  </Text>
  < Center>
  <ThemedButton color="white" type="submit" mt="2rem" mx="auto" width="180px" height="50px">
    Liquadate
  </ThemedButton>
  </Center>
</form>
</Box>

<Table rows={vaultHoldingsRows} shownAs="vaultHoldingsTable" />
</Flex>
</DefaultLayout>;
};

export default Liquidate;
