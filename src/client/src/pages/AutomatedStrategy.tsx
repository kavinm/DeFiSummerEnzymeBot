import React from 'react';
import { Box, Text, Select, Grid, Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import uuid from 'react-uuid';

import DefaultLayout from '../layouts/DefaultLayout';
import { ThemedButton, ThemedInput, Table } from '../components/shared';
import { StopLimitActions } from '../enums';

const StyledSelect = styled(Select)`
  & {
    color: white;
    option {
      color: black !important;
    }
  }
`;

const stopLimitRows = [
  { id: uuid(), asset: 'AXS', type: StopLimitActions.BUY, date: '07/13/2021', amount: 100 },
  { id: uuid(), asset: 'AXS', type: StopLimitActions.SELL, date: '07/13/2021', amount: 100 },
  { id: uuid(), asset: 'AXS', type: StopLimitActions.BUY, date: '07/13/2021', amount: 100 },
];

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

const AutomatedStrategy: React.FC = () => {
  return (
    <DefaultLayout name="Automated Strategy">
      <Flex mt="40px" justifyContent="center" px="20px">
        <Box
          backgroundColor="accentCards"
          border="1px solid"
          borderColor="accentOutlines"
          padding="20px"
          maxW="560px"
          borderRadius="8px"
          mr="20px"
        >
          <Text htmlFor="ercToken" as="label" fontSize="lg" fontWeight="bold" color="headers">
            ERC Token
          </Text>
          <StyledSelect id="ercToken" color="gray.600" mt="0.25rem" borderColor="gray.600">
            <option>MLN</option>
            <option>UNI</option>
            <option>AXS</option>
            <option>WETH</option>
          </StyledSelect>
          <Grid templateColumns="repeat(2, 1fr)" mt="1.25rem">
            <Box mr="20px">
              <Text display="block" as="label" fontSize="lg" fontWeight="bold" color="headers" mb="1rem">
                Buy
              </Text>
              <ThemedInput type="text" borderColor="gray.600" mb="1rem" />
              <ThemedInput type="text" borderColor="gray.600" mb="1rem" />
              <ThemedInput type="text" borderColor="gray.600" />
              <ThemedButton w="100%" py="1.5rem" type="button" mt="2rem">
                Buy Now
              </ThemedButton>
            </Box>
            <Box>
              <Text display="block" as="label" fontSize="lg" fontWeight="bold" color="headers" mb="1rem">
                Sell
              </Text>
              <ThemedInput type="text" borderColor="gray.600" mb="1rem" />
              <ThemedInput type="text" borderColor="gray.600" mb="1rem" />
              <ThemedInput type="text" borderColor="gray.600" />
              <ThemedButton w="100%" py="1.5rem" type="button" mt="2rem">
                Sell Now
              </ThemedButton>
            </Box>
          </Grid>
        </Box>
        <Table rows={stopLimitRows} shownAs="stopLimitTable" mr="20px" />
        <Table rows={vaultHoldingsRows} shownAs="vaultHoldingsTable" />
      </Flex>
    </DefaultLayout>
  );
};

export default AutomatedStrategy;
