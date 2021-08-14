import { useEffect, useState } from "react";
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
import { EnzymeBot, getERC20Tokens } from "enzyme-autotrader-bot";

import { ThemedButton, ThemedTokenSelect } from "../shared";
import useAuthentication from "../../utils/useAuthentication";

type TokenOptions = {
  from?: {
    value?: string;
    label?: string;
  }[];
  to?: {
    value?: string;
    label?: string;
  }[];
};

const BuyToken: React.FC = () => {
  const { handleSubmit } = useForm();
  const [tokenOptions, setTokenOptions] = useState<TokenOptions>({
    from: [],
    to: [],
  });
  const [, , authentication] = useAuthentication();
  const [, setBot] = useState<Partial<EnzymeBot>>({});

  const onSubmit = (data: any) => {
    console.log({ data });
  };

  const getFromTokens = async () => {
    return await getERC20Tokens("KOVAN");
  };

  useEffect(() => {
    getFromTokens().then((res) => {
      const opts = res.map((r) => ({ value: r.symbol, label: r.symbol }));
      setTokenOptions((prev) => ({ ...prev, to: opts }));
    });
    try {
      EnzymeBot.createFromInput(
        authentication.vaultAddress,
        authentication.privateKey
      )
        .then((res) => {
          setBot(res);
          return res;
        })
        .then(async (bot) => {
          const tokens = await bot.getHoldingsWithNumberAmounts();
          setTokenOptions((prev) => ({
            ...prev,
            from: tokens
              ?.filter((t) => t.amount)
              .map((t) => ({ value: t.symbol, label: t.symbol })),
          }));
        });
    } catch (error) {
      console.error(error);
      alert("Not a valid vault address");
    }
  }, [authentication.vaultAddress, authentication.privateKey]);

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
        <ThemedTokenSelect options={tokenOptions.from} id="ercToken" />
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
        <ThemedTokenSelect options={tokenOptions.to} id="ercToken" />
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
