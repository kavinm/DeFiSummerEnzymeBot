import React from "react";
import {
  Box,
  Text,
  Select,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import uuid from "react-uuid";
import { BsArrowDown } from "react-icons/bs";
import { CheckIcon } from "@chakra-ui/icons";

import DefaultLayout from "../layouts/DefaultLayout";
import { ThemedButton, ThemedInput, Table } from "../components/shared";
import { StopLimitActions } from "../enums";
import { useForm } from "react-hook-form";

const StyledSelect = styled(Select)`
  & {
    color: white;
    option {
      color: black !important;
    }
    :focus {
      border: 1px solid white;
    }
  }
`;

const stopLimitRows = [
  {
    id: uuid(),
    asset: "AXS",
    type: StopLimitActions.BUY,
    date: "07/13/2021",
    amount: 100,
  },
  {
    id: uuid(),
    asset: "AXS",
    type: StopLimitActions.SELL,
    date: "07/13/2021",
    amount: 100,
  },
  {
    id: uuid(),
    asset: "AXS",
    type: StopLimitActions.BUY,
    date: "07/13/2021",
    amount: 100,
  },
];

const vaultHoldingsRows = [
  {
    id: uuid(),
    asset: "AXS",
    balance: 50.1,
    allocation: 14073.4836,
    price: 1990.16,
  },
  {
    id: uuid(),
    asset: "steCRV-gauge",
    balance: 49.9,
    allocation: 13783.5404,
    price: 2024.08,
  },
];

const AutomatedStrategy: React.FC = () => {
  const { handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log({ data });
  };

  return (
    <DefaultLayout name="Automated Strategy">
      <Flex mt="40px" justifyContent="center" px="20px">
        <Box mr="20px">
          <Text as="span" color="white" mb="0.5rem" display="block">
            Strategy
          </Text>
          <Box
            backgroundColor="accentCards"
            border="1px solid"
            borderColor="accentOutlines"
            padding="20px"
            p="2rem"
            borderRadius="8px"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* FROM */}
              <Text as="label" fontSize="lg" fontWeight="bold" color="headers">
                From
              </Text>
              <Text
                mt="1rem"
                display="block"
                as="label"
                fontSize="sm"
                fontWeight=""
                color="headers"
              >
                Token
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
              <Text
                as="label"
                fontSize="sm"
                fontWeight=""
                color="headers"
                mt="0.5rem"
                display="block"
              >
                When Price Is
              </Text>
              <InputGroup borderColor="gray.600">
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children="$"
                />
                <Input
                  placeholder="Enter amount"
                  _focus={{
                    border: "1px solid white",
                  }}
                  color="white"
                  type="number"
                  pattern="^\(\d{1,3}(\,\d{3})*|(\d+))(\.\d{2})?$"
                />
                <InputRightElement children={<CheckIcon color="green.500" />} />
              </InputGroup>
              {/* ARROW  */}
              <Flex justifyContent="center" mt="1.5rem" mb="0.5rem">
                <BsArrowDown color="white" fontSize="1.25rem" />
              </Flex>
              {/* TO */}
              <Text
                display="block"
                as="label"
                fontSize="lg"
                fontWeight="bold"
                color="headers"
              >
                To
              </Text>
              <Text
                mt="1rem"
                display="block"
                as="label"
                fontSize="sm"
                fontWeight=""
                color="headers"
              >
                Token
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
              <Text
                as="label"
                fontSize="sm"
                fontWeight=""
                color="headers"
                mt="0.5rem"
                display="block"
              >
                When Price Is
              </Text>
              <InputGroup borderColor="gray.600">
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children="$"
                />
                <Input
                  placeholder="Enter amount"
                  _focus={{
                    border: "1px solid white",
                  }}
                  color="white"
                  type="number"
                  pattern="^\(\d{1,3}(\,\d{3})*|(\d+))(\.\d{2})?$"
                />
                <InputRightElement children={<CheckIcon color="green.500" />} />
              </InputGroup>
              <ThemedButton type="submit" w="full" mt="2.5rem" py="1.5rem">
                Trade
              </ThemedButton>
            </form>
          </Box>
        </Box>
        <Box mr="20px">
          <Text as="span" color="white" mb="0.5rem" display="block">
            Orders
          </Text>
          <Table rows={stopLimitRows} shownAs="stopLimitTable" />
        </Box>
        <Box mr="20px">
          <Text as="span" color="white" mb="0.5rem" display="block">
            Vault Holdings
          </Text>
          <Table rows={vaultHoldingsRows} shownAs="vaultHoldingsTable" />
        </Box>
      </Flex>
    </DefaultLayout>
  );
};

export default AutomatedStrategy;
