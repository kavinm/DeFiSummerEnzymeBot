import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Checkbox,
  useDisclosure,
  Avatar,
} from "@chakra-ui/react";
import uuid from "react-uuid";
import styled from "@emotion/styled";
import { Controller, useForm } from "react-hook-form";
import numeral from "numeral";
import {
  EnzymeBot,
  getERC20Tokens,
  getPrice,
  main,
} from "enzyme-autotrader-bot";
import { useAtom } from "jotai";

import { ThemedButton, ThemedTokenSelect } from "../components/shared";
import DefaultLayout from "../layouts/DefaultLayout";
import LiquidateConfirmationModal from "../components/partial/LiquidateConfirmationModal";
import { ENZYME_KOVAN_GRAPH_API } from "../config/api";
import useAuthentication from "../utils/useAuthentication";
import { reloadAutomatedStrategyHoldingsAtom } from "../atoms";

const options = [
  { value: "axs", label: "AXS" },
  { value: "weth", label: "WETH" },
  { value: "mln", label: "MLN" },
  { value: "uni", label: "UNI" },
  { value: "comp", label: "COMP" },
  { value: "1inch", label: "1INCH" },
  { value: "aave", label: "AAVE" },
];

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

type Holdings = { id: string; [x: string]: any }[];
type TokenOptions = {
  value?: string;
  label?: string;
}[];

type FormData = {
  liquidateTokens: string[];
  toBeSwappedInto: {
    value?: string;
    label?: string;
  };
};

const Liquidate: React.FC = () => {
  const { handleSubmit, register, control, setValue, watch } =
    useForm<FormData>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, , authentication] = useAuthentication();
  const [vaultHoldings, setVaultHoldings] = useState<Holdings>([]);
  const [reload, setReload] = useAtom(reloadAutomatedStrategyHoldingsAtom);
  const [tokenOptions, setTokenOptions] = useState<TokenOptions>([]);
  const [bot, setBot] = useState<Partial<EnzymeBot>>({});

  const existingliquidateTokens = watch("liquidateTokens") as string[];

  const getFromTokens = async () => {
    return await getERC20Tokens("KOVAN");
  };

  useEffect(() => {
    getFromTokens().then((res) => {
      const opts = res.map((r) => ({ value: r.symbol, label: r.symbol }));

      setTokenOptions(opts);
    });
    try {
      EnzymeBot.createFromInput(
        authentication.vaultAddress,
        authentication.privateKey
      ).then(async (res) => {
        setBot(res);
        const holdingRes = await res.getHoldingsWithNumberAmounts();

        const holdingsAmounts =
          holdingRes?.reduce((acc, curr) => acc + curr.amount, 0) || 0;

        const holdings = await Promise.all(
          holdingRes?.map(async (h) => {
            // sync
            // async
            const price = await getPrice(
              ENZYME_KOVAN_GRAPH_API,
              h.symbol || ""
            );

            return {
              id: uuid(),
              asset: h.symbol,
              balance: h.amount,
              allocation: h.amount / holdingsAmounts,
              price,
              name: h.name,
            };
          }) || []
        );

        setVaultHoldings(holdings);
      });
    } catch (error) {
      console.error(error);
      alert("Not a valid vault address");
    }
  }, [authentication.vaultAddress, authentication.privateKey]);

  useEffect(() => {
    getFromTokens().then((res) => {
      const opts = res.map((r) => ({ value: r.symbol, label: r.symbol }));
      setTokenOptions(opts);
    });
    if (reload) {
      try {
        EnzymeBot.createFromInput(
          authentication.vaultAddress,
          authentication.privateKey
        ).then(async (res) => {
          setBot(res);
          const holdingRes = await res.getHoldingsWithNumberAmounts();

          const holdingsAmounts =
            holdingRes?.reduce((acc, curr) => acc + curr.amount, 0) || 0;

          const holdings = await Promise.all(
            holdingRes?.map(async (h) => {
              const price = await getPrice(
                ENZYME_KOVAN_GRAPH_API,
                h.symbol || ""
              );

              return {
                id: uuid(),
                asset: h.symbol,
                balance: h.amount,
                allocation: h.amount / holdingsAmounts,
                price,
                name: h.name,
              };
            }) || []
          );

          setVaultHoldings(holdings);
        });
      } catch (error) {
        console.error(error);
        alert("Not a valid vault address");
      }

      setTimeout(() => {
        setReload(false);
      }, 300);
    }
  }, [reload, authentication.vaultAddress, authentication.privateKey]);

  const onSubmit = ({ liquidateTokens, toBeSwappedInto }: FormData) => {
    try {
      main("liquidate", bot as EnzymeBot, {
        liquidateTokens,
        toBeSwappedInto: toBeSwappedInto.value,
      });

      setTimeout(() => {
        alert("Liquidate Successful.");
        setReload(true);
      }, 40000);
    } catch (err) {
      alert("Error");
      console.log({ err });
    }
  };

  const triggerSubmit = handleSubmit(onSubmit);

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
          <form>
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
                  <input type="hidden" {...register("liquidateTokens")} />
                  {vaultHoldings.map((r) => (
                    <Tr key={r.id}>
                      <Td padding="16px 0px 16px 20px" alignItems="center">
                        <Checkbox
                          borderColor="accentOutlines"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setValue("liquidateTokens", [
                                ...existingliquidateTokens,
                                r.asset,
                              ]);
                            } else {
                              setValue(
                                "liquidateTokens",
                                existingliquidateTokens.filter(
                                  (t) => t !== r.asset
                                )
                              );
                            }
                          }}
                        />
                      </Td>
                      <Td>
                        <Flex minW="240px">
                          <Box mr="16px">
                            <Avatar
                              src={`https://cryptoicon-api.vercel.app/api/icon/${r.asset.toLowerCase()}`}
                              alt={r.asset}
                            />
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
                              {r.asset}
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
                          {r.balance.toFixed(8)}
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
                          {numeral(r.price * r.balance).format("$0,0.00")}
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
              <Controller
                control={control}
                name="toBeSwappedInto"
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <ThemedTokenSelect
                    options={tokenOptions}
                    onBlur={onBlur}
                    onChange={onChange}
                    checked={value}
                    inputRef={ref}
                    id="toBeSwappedInto"
                  />
                )}
              />
            </Flex>
            <Flex>
              <ThemedButton
                type="button"
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
      <LiquidateConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        triggerSubmit={triggerSubmit}
      />
    </>
  );
};

export default Liquidate;
