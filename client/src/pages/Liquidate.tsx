import React from "react";
import { Box, Text, Flex, Select } from "@chakra-ui/react";
import uuid from "react-uuid";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { BsArrowDown } from "react-icons/bs";

import { Table, ThemedButton, ThemedInput } from "../components/shared";
import DefaultLayout from "../layouts/DefaultLayout";

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

const Liquidate: React.FC = () => {
  const { handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log({ data });
  };

  return (
    <DefaultLayout name="Liquidate">
      <Flex mt="40px" justifyContent="center">
        <Box
          backgroundColor="accentCards"
          border="1px solid"
          borderColor="accentOutlines"
          p="2rem"
          borderRadius="8px"
          mr="20px"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Text
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
            {/* ARROW  */}
            <Flex justifyContent="center" mt="1.5rem" mb="0.5rem">
              <BsArrowDown color="white" fontSize="1.25rem" />
            </Flex>
            <Text
              mt="1rem"
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
            <ThemedButton type="submit" w="full" mt="2.5rem" py="1.5rem">
              Liquidate
            </ThemedButton>
          </form>
        </Box>

        <Table rows={vaultHoldingsRows} shownAs="vaultHoldingsTable" />
      </Flex>
    </DefaultLayout>
  );
};

export default Liquidate;
