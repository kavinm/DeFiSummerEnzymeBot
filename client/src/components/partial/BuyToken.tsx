import React from "react";
import {
  Select,
  Text,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { BsArrowDown } from "react-icons/bs";
import { CheckIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";

import { ThemedButton, ThemedInput } from "../shared";

const StyledSelect = styled(Select)`
  & {
    color: white;
    option {
      color: black !important;
    }
  }
`;

const BuyToken: React.FC = () => {
  const { handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log({ data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text
        as="label"
        display="block"
        fontSize="lg"
        fontWeight="bold"
        color="headers"
        mt="1rem"
      >
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
  );
};

export default BuyToken;
