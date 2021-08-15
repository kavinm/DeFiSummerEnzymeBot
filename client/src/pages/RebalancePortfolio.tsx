import { useCallback, useEffect, useState } from "react";
import { uniqBy } from "lodash";
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
  Button,
  useDisclosure,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";
import numeral from "numeral";
import { EnzymeBot, main } from "enzyme-autotrader-bot";
import { useAtom } from "jotai";

import DefaultLayout from "../layouts/DefaultLayout";
import { ThemedButton } from "../components/shared";
import RebalanceConfirmationModal from "../components/partial/RebalanceConfirmationModal";
import {
  vaultHoldingsAtom,
  holdingsChoicesAtom,
  reloadBuySellLimitHoldingsAtom,
} from "../atoms";
import { Networks } from "../config/api";
import useAuthentication from "../utils/useAuthentication";

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

type FormData = {
  rebalancedHoldings: {
    [symbol: string]: {
      symbol: string;
      amount: number;
    };
  };
};

const RebalancePortfolio: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bot, setBot] = useState<Partial<EnzymeBot>>({});
  const { handleSubmit, register } = useForm<FormData>();
  const [, , authentication] = useAuthentication();
  const [vaultHoldings] = useAtom(vaultHoldingsAtom);
  const [holdingsChoices] = useAtom(holdingsChoicesAtom);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [reload, setReload] = useAtom(reloadBuySellLimitHoldingsAtom);

  const totalCurrentValue = vaultHoldings.reduce(
    (acc, curr) => acc + curr.price * curr.balance,
    0
  );

  const iterator = (h: { [x: string]: any; id: string }) => h.asset;

  const onSubmit = ({ rebalancedHoldings }: FormData) => {
    setLoading(true);
    try {
      const holdings = Object.entries(rebalancedHoldings)
        .map((e) => ({ ...e[1], amount: +e[1].amount }))
        .filter((e) => e.amount);
      main("rebalancePortfolioUSDCPlan", bot as EnzymeBot, {
        rebalancedHoldings: holdings,
      }).then((res) => {
        if (res) {
          toast({
            title: "Rebalance portfolio successful.",
            description: res,
            position: "top",
            isClosable: true,
            duration: 10000,
          });
        } else {
          toast({
            title: "Rebalance portfolio unsuccessful.",
            description: res,
            position: "top",
            isClosable: true,
            duration: 10000,
          });
        }
        setLoading(false);
        setReload(true);
      });
    } catch (err) {
      toast({
        title: "Rebalance portfolio unsuccessful.",
        position: "top",
        isClosable: true,
        duration: 10000,
      });
      setLoading(false);
      console.log({ err });
    }
  };

  const triggerSubmit = handleSubmit(onSubmit);

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
    configureBot();
  }, [configureBot]);

  useEffect(() => {
    if (reload) {
      configureBot();
      setTimeout(() => {
        setReload(false);
      }, 300);
    }
    // eslint-disable-next-line
  }, [reload]);

  return (
    <>
      <DefaultLayout name="Rebalance Portfolio">
        <Box
          backgroundColor="accentCards"
          border="1px solid"
          borderColor="accentOutlines"
          p="2rem"
          borderRadius="8px"
          maxW="1100px"
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
                  </Tr>
                </Thead>
                <Thead>
                  <Tr backgroundColor="accentSurface">
                    <Th color="gray.300" fontWeight="500">
                      TOTAL
                    </Th>
                    <Th color="gray.300" fontWeight="500"></Th>
                    <Th color="gray.300" fontWeight="500"></Th>
                    <Th color="gray.300" fontWeight="500">
                      {numeral(totalCurrentValue).format("$ 0,0.00")}
                    </Th>
                    <Th color="gray.300" fontWeight="500">
                      -
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {uniqBy([...vaultHoldings, ...holdingsChoices], iterator).map(
                    (r, i) => (
                      <Tr key={r.id}>
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
                            {r.balance}
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
                        <Td>
                          <NumberInput w="150px">
                            <NumberInputField
                              color="white"
                              borderColor="accentOutlines"
                              {...register(
                                `rebalancedHoldings.${r.asset}.amount` as any
                              )}
                            />
                          </NumberInput>
                          <input
                            type="hidden"
                            {...register(
                              `rebalancedHoldings.${r.asset}.symbol` as any
                            )}
                            value={r.asset}
                          />
                        </Td>
                      </Tr>
                    )
                  )}
                </Tbody>
              </StyledTable>
            </Box>
            <Flex justifyContent="center" h="48px" mt="2rem">
              <Button
                color="placeholders"
                border="1px transparent solid"
                backgroundColor="accentOutlines"
                _hover={{
                  backgroundColor: "accentSurface",
                }}
                _active={{
                  backgroundColor: "accentOutlines",
                  border: "1px solid",
                  borderColor: "primaryLight",
                }}
                variant="solid"
                px="4rem"
                h="100%"
                mr="20px"
              >
                Reset
              </Button>
              <ThemedButton
                px="4rem"
                h="100%"
                onClick={onOpen}
                isLoading={loading}
              >
                Confirm
              </ThemedButton>
            </Flex>
          </form>
        </Box>
      </DefaultLayout>
      <RebalanceConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        triggerSubmit={triggerSubmit}
      />
    </>
  );
};

export default RebalancePortfolio;
