import { useCallback, useEffect, useState } from "react";
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
  useToast,
  Skeleton,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Controller, useForm } from "react-hook-form";
import numeral from "numeral";
import { EnzymeBot, main } from "enzyme-autotrader-bot";
import { useAtom } from "jotai";
import uuid from "react-uuid";

import { ThemedButton, ThemedTokenSelect } from "../components/shared";
import DefaultLayout from "../layouts/DefaultLayout";
import LiquidateConfirmationModal from "../components/partial/LiquidateConfirmationModal";
import useAuthentication from "../utils/useAuthentication";
import {
  availableTokensAtom,
  reloadBuySellLimitHoldingsAtom,
  vaultHoldingsAtom,
} from "../atoms";
import { Networks } from "../config/api";

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
  const [tokenOptions, setTokenOptions] = useState<TokenOptions>([]);
  const [bot, setBot] = useState<Partial<EnzymeBot>>({});
  const { handleSubmit, register, control, setValue, watch } =
    useForm<FormData>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, , authentication] = useAuthentication();
  const [vaultHoldings] = useAtom(vaultHoldingsAtom);
  const [reload, setReload] = useAtom(reloadBuySellLimitHoldingsAtom);
  const [availableTokens] = useAtom(availableTokensAtom);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const existingliquidateTokens = watch("liquidateTokens") as string[];

  const configureBot = useCallback(() => {
    try {
      (async () => {
        if (authentication.vaultAddress && authentication.privateKey) {
          let bot: EnzymeBot;

          if (authentication.network === Networks.Kovan) {
            bot = await EnzymeBot.createFromInput(
              authentication.vaultAddress,
              authentication.privateKey
            );
          } else {
            bot = await EnzymeBot.createFromInputMainnet(
              authentication.vaultAddress,
              authentication.privateKey
            );
          }

          setBot(bot);
        }
      })();
    } catch (error) {
      console.error(error);
    }
  }, [
    authentication.vaultAddress,
    authentication.privateKey,
    authentication.network,
  ]);

  useEffect(() => {
    setTokenOptions(availableTokens);
    configureBot();
  }, [setTokenOptions, configureBot, availableTokens]);

  useEffect(() => {
    if (reload) {
      setTokenOptions(availableTokens);
      configureBot();
      setTimeout(() => {
        setReload(false);
      }, 300);
    }
    // eslint-disable-next-line
  }, [reload]);

  const onSubmit = ({ liquidateTokens, toBeSwappedInto }: FormData) => {
    setLoading(true);
    try {
      main("liquidate", bot as EnzymeBot, {
        liquidateTokens,
        toBeSwappedInto: toBeSwappedInto.value,
      }).then((res) => {
        toast({
          title: "Liquidate successful.",
          description: res,
          position: "top",
          isClosable: true,
          duration: 10000,
        });
        setLoading(false);
        setReload(true);
      });
    } catch (err) {
      toast({
        title: "Liquidate failed.",
        description: err,
        position: "top",
        isClosable: true,
        duration: 10000,
      });
      setLoading(false);
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
            <input type="hidden" {...register("liquidateTokens")} />
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
                  {vaultHoldings.length
                    ? vaultHoldings.map((r) => (
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
                                  bg="gray.400"
                                  icon={<Box />}
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
                              {numeral(r.price).format("$ 0,0.00")}
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
                              {numeral(r.price * r.balance).format("$ 0,0.00")}
                            </Text>
                          </Td>
                        </Tr>
                      ))
                    : Array.from({ length: 2 }).map((_, i) => (
                        <Tr key={uuid()}>
                          <Td padding="16px 0px 16px 20px">
                            <Skeleton height="20px" w="20px" />
                          </Td>
                          <Td>
                            <Flex minW="240px">
                              <Box mr="16px">
                                <Skeleton w="40px" height="40px" />
                              </Box>
                              <Box>
                                <Skeleton height="20px" width="120px" />
                                <Skeleton height="16px" mt="4px" width="72px" />
                              </Box>
                            </Flex>
                          </Td>
                          <Td>
                            <Skeleton height="20px" />
                          </Td>
                          <Td>
                            <Skeleton height="20px" />
                          </Td>
                          <Td>
                            <Skeleton height="20px" />
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
                isLoading={loading}
                isDisabled={!vaultHoldings.length}
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
