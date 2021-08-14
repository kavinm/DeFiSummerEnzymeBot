import { useState, useEffect, useCallback } from "react";
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
import { Controller, useForm } from "react-hook-form";
import { EnzymeBot, main } from "enzyme-autotrader-bot";
import { useAtom } from "jotai";

import { ThemedButton, ThemedTokenSelect } from "../shared";
import useAuthentication from "../../utils/useAuthentication";
import {
  availableTokensAtom,
  reloadAutomatedStrategyHoldingsAtom,
  vaultHoldingsAtom,
} from "../../atoms";

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

type FormData = {
  tokenBuy: {
    value?: string;
    label?: string;
  };
  tokenSell: {
    value?: string;
    label?: string;
  };
  priceLimit: number;
};

const SellToken: React.FC = () => {
  const { handleSubmit, register, control } = useForm<FormData>();
  const [tokenOptions, setTokenOptions] = useState<TokenOptions>({
    from: [],
    to: [],
  });
  const [, , authentication] = useAuthentication();
  const [bot, setBot] = useState<Partial<EnzymeBot>>({});
  const [reload, setReload] = useAtom(reloadAutomatedStrategyHoldingsAtom);
  const [availableTokens] = useAtom(availableTokensAtom);
  const [vaultHoldings] = useAtom(vaultHoldingsAtom);

  const onSubmit = ({ tokenSell, tokenBuy, priceLimit }: FormData) => {
    try {
      main("sellLimit", bot as EnzymeBot, {
        tokenSell: tokenSell.value,
        tokenBuy: tokenBuy.value,
        priceLimit: +priceLimit,
      });
      setTimeout(() => {
        setReload(true);
      }, 40000);
    } catch (err) {
      console.log({ err });
    }
  };

  const hydrateOptions = useCallback(() => {
    if (authentication.vaultAddress && authentication.privateKey) {
      setTokenOptions((prev) => ({ ...prev, to: availableTokens }));
      try {
        (async () => {
          const bot = await EnzymeBot.createFromInput(
            authentication.vaultAddress,
            authentication.privateKey
          );
          setBot(bot);
          setTokenOptions((prev) => ({
            ...prev,
            from: vaultHoldings
              ?.filter((t) => t.balance)
              .map((t) => ({ value: t.asset, label: t.asset })),
          }));
        })();
      } catch (error) {
        console.error(error);
      }
    }
  }, [
    authentication.vaultAddress,
    authentication.privateKey,
    availableTokens,
    vaultHoldings,
  ]);

  useEffect(() => {
    hydrateOptions();
  }, [hydrateOptions]);

  useEffect(() => {
    if (reload) {
      hydrateOptions();
      setTimeout(() => {
        setReload(false);
      }, 300);
    }
    // eslint-disable-next-line
  }, [reload]);

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
        <Controller
          control={control}
          name="tokenSell"
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <ThemedTokenSelect
              options={tokenOptions.from}
              onBlur={onBlur}
              onChange={onChange}
              checked={value}
              inputRef={ref}
              id="tokenSell"
            />
          )}
        />
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
          {...register("priceLimit")}
        />
        <InputRightElement
          children={<CheckIcon color="green.500" />}
          zIndex="0"
        />
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
        <Controller
          control={control}
          name="tokenBuy"
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <ThemedTokenSelect
              options={tokenOptions.to}
              onBlur={onBlur}
              onChange={onChange}
              checked={value}
              inputRef={ref}
              id="tokenBuy"
            />
          )}
        />
      </Flex>
      <ThemedButton type="submit" w="full" mt="2.5rem" py="1.5rem">
        Trade
      </ThemedButton>
    </form>
  );
};

export default SellToken;
