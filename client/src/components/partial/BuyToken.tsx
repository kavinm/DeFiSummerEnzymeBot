import React from "react";
import {
  Text,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";

import { BsArrowDown } from "react-icons/bs";
import { CheckIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";

import { ThemedButton, ThemedTokenSelect } from "../shared";

const options = [
  { value: "axs", label: "AXS" },
  { value: "weth", label: "WETH" },
  { value: "mln", label: "MLN" },
  { value: "uni", label: "UNI" },
  { value: "comp", label: "COMP" },
  { value: "1inch", label: "1INCH" },
  { value: "aave", label: "AAVE" },
];

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
        <ThemedTokenSelect options={options} id="ercToken" />
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
        <ThemedTokenSelect options={options} id="ercToken" />
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
          zIndex="0"
        />
        <Input
          placeholder="Enter amount"
          color="white"
          type="number"
          pattern="^\(\d{1,3}(\,\d{3})*|(\d+))(\.\d{2})?$"
        />
        <InputRightElement
          children={<CheckIcon color="green.500" />}
          zIndex="0"
        />
      </InputGroup>
      <ThemedButton type="submit" w="full" mt="2.5rem" py="1.5rem">
        Trade
      </ThemedButton>
    </form>
  );
};

export default BuyToken;
