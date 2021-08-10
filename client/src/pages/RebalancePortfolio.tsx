import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Box,
  Flex,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import uuid from "react-uuid";
import styled from "@emotion/styled";
import numeral from "numeral";

import { ReactComponent as Avatar } from "../assets/logo/avatar.svg";

const StyledTable = styled(Table)`
  & {
    th {
      border-bottom: 1px solid transparent;
    }
    tr {
      td {
        border: 1px solid;
        border-right: 1px solid transparent;
      }
    }
    tr:not(:last-child) td {
      border-bottom: 1px solid #374151;
    }
  }
`;

const vaultHoldingsRows = [
  {
    id: uuid(),
    name: "Wrapped Ether",
    symbol: "WETH",
    price: 62313599.18,
    currentBalance: 0,
    currentValue: 62313599.18,
  },
  {
    id: uuid(),
    name: "Uniswap",
    symbol: "UNI",
    price: 62313599.18,
    currentBalance: 1000,
    currentValue: 0,
  },
  {
    id: uuid(),
    name: "Compound",
    symbol: "COMP",
    price: 62313599.18,
    currentBalance: 0,
    currentValue: 0,
  },
  {
    id: uuid(),
    name: "1inch",
    symbol: "1INCH",
    price: 62313599.18,
    currentBalance: 0,
    currentValue: 0,
  },
  {
    id: uuid(),
    name: "Aave",
    symbol: "AAVE",
    price: 62313599.18,
    currentBalance: 0,
    currentValue: 0,
  },
  {
    id: uuid(),
    name: "Banco Network Token",
    symbol: "BNT",
    price: 62313599.18,
    currentBalance: 0,
    currentValue: 0,
  },
  {
    id: uuid(),
    name: "1inch",
    symbol: "1INCH",
    price: 62313599.18,
    currentBalance: 0,
    currentValue: 0,
  },
];

const RebalancePortfolio: React.FC = () => {
  return (
    <DefaultLayout name="Rebalance Portfolio">
      <Flex mt="40px" justifyContent="center">
        <Box
          backgroundColor="accentCards"
          border="1px solid"
          borderColor="accentOutlines"
          p="2rem"
          borderRadius="8px"
        >
          <Text
            display="block"
            as="label"
            fontSize="sm"
            fontWeight=""
            color="headers"
          >
            Vault Holdings
          </Text>
          <Box
            border="1px solid"
            borderColor="accentOutlines"
            borderRadius="8px"
            padding="0px"
            mt="0.5rem"
            maxH="400px !important"
            overflow="hidden auto"
          >
            <StyledTable variant="simple">
              <Thead>
                <Tr backgroundColor="accentOutlines">
                  <Th color="gray.300" fontWeight="500">
                    TOKEN
                  </Th>
                  <Th color="gray.300" fontWeight="500">
                    PRICE
                  </Th>
                  <Th color="gray.300" fontWeight="500">
                    CURRENT BALANCE
                  </Th>
                  <Th color="gray.300" fontWeight="500">
                    CURRENT VALUE
                  </Th>
                  <Th color="gray.300" fontWeight="500">
                    DESIRED WEIGHT
                  </Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {vaultHoldingsRows.map((r) => (
                  <Tr key={r.id}>
                    <Td>
                      <Flex minW="240px">
                        <Box mr="16px">
                          <Avatar />
                        </Box>
                        <Box>
                          <Text
                            as="span"
                            display="block"
                            fontSize="sm"
                            fontWeight="medium"
                            color="white"
                          >
                            {r.name}
                          </Text>
                          <Text
                            as="span"
                            fontSize="sm"
                            fontWeight="400"
                            color="placeholders"
                          >
                            {r.symbol}
                          </Text>
                        </Box>
                      </Flex>
                    </Td>
                    <Td>
                      <Text
                        as="span"
                        display="block"
                        fontSize="sm"
                        fontWeight="500"
                        color="gray.50"
                      >
                        {numeral(r.price).format("$0,0.00")}
                      </Text>
                    </Td>
                    <Td>
                      <Text
                        as="span"
                        display="block"
                        fontSize="sm"
                        fontWeight="500"
                        color="placeholders"
                      >
                        {r.currentBalance}
                      </Text>
                    </Td>
                    <Td>
                      <Text
                        as="span"
                        display="block"
                        fontSize="sm"
                        fontWeight="500"
                        color="gray.50"
                      >
                        {numeral(r.currentValue).format("$0,0.00")}
                      </Text>
                    </Td>
                    <Td>
                      <NumberInput w="150px">
                        <NumberInputField
                          color="white"
                          borderColor="accentOutlines"
                        />
                      </NumberInput>
                    </Td>
                    <Td>
                      {/* COMPUTATIOn */}
                      <Text
                        as="span"
                        display="block"
                        fontSize="sm"
                        fontWeight="500"
                        color="gray.50"
                      >
                        {numeral(r.currentValue).format("$0,0.00")}
                      </Text>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </StyledTable>
          </Box>
        </Box>
      </Flex>
    </DefaultLayout>
  );
};

export default RebalancePortfolio;
