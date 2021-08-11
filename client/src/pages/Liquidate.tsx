import React from "react";
import {
  Box,
  Text,
  Flex,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Checkbox,
  useDisclosure,
} from "@chakra-ui/react";
import uuid from "react-uuid";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import numeral from "numeral";

import { ReactComponent as Avatar } from "../assets/logo/avatar.svg";
import { ThemedButton, ThemedInput } from "../components/shared";
import DefaultLayout from "../layouts/DefaultLayout";
import LiquidateConfirmationModal from "../components/partial/LiquidateConfirmationModal";

const StyledSelect = styled(Select)`
  & {
    color: white;
    option {
      color: black !important;
    }
  }
`;

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

const Liquidate: React.FC = () => {
  const { handleSubmit } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = (data: any) => {
    console.log({ data });
  };

  return (
    <>
      <DefaultLayout name="Liquidate">
        <Box
          backgroundColor="accentCards"
          border="1px solid"
          borderColor="accentOutlines"
          p="2rem"
          borderRadius="8px"
          maxW="1000px"
          mx={{ base: "2rem", xl: "auto" }}
          mt="40px"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Text
              display="block"
              as="label"
              fontSize="sm"
              fontWeight=""
              color="headers"
            >
              Vault Holdings
            </Text>
            {/* VAULT HOLDINGS */}
            <Box
              border="1px solid"
              borderColor="accentOutlines"
              borderRadius="8px"
              padding="0px"
              mt="0.5rem"
              maxH="400px !important"
              overflow={{ base: "auto", xl: "hidden auto" }}
            >
              <StyledTable variant="simple">
                <Thead>
                  <Tr backgroundColor="accentOutlines">
                    <Th padding="16px"></Th>
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
                  </Tr>
                </Thead>
                <Tbody>
                  {vaultHoldingsRows.map((r) => (
                    <Tr key={r.id}>
                      <Td padding="16px 0px 16px 20px" alignItems="center">
                        <Checkbox borderColor="accentOutlines"></Checkbox>
                      </Td>
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
                    </Tr>
                  ))}
                </Tbody>
              </StyledTable>
            </Box>
            {/* ERC TOKEN */}
            <Text
              mt="1.5rem"
              mb="0.5rem"
              display="block"
              as="label"
              fontSize="sm"
              fontWeight=""
              color="headers"
            >
              ERC Token
            </Text>
            <Flex alignItems="center">
              <ThemedInput
                type="text"
                borderColor="gray.600"
                w="16rem"
                borderTopRightRadius="0px"
                borderBottomRightRadius="0px"
                borderRight="0px"
              />
              <StyledSelect
                id="ercToken"
                color="gray.600"
                borderColor="gray.600"
                w="6rem"
                borderTopLeftRadius="0px"
                borderBottomLeftRadius="0px"
              >
                <option>MLN</option>
                <option>UNI</option>
                <option>AXS</option>
                <option>WETH</option>
              </StyledSelect>
            </Flex>
            <Flex>
              <ThemedButton
                type="submit"
                w="80%"
                maxW="200px"
                mt="2.5rem"
                py="1.5rem"
                mx="auto"
                onClick={onOpen}
              >
                Liquidate
              </ThemedButton>
            </Flex>
          </form>
        </Box>
      </DefaultLayout>
      <LiquidateConfirmationModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Liquidate;
