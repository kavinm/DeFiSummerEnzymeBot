import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import uuid from "react-uuid";
import { EnzymeBot, getPrice } from "enzyme-autotrader-bot";
import { useAtom } from "jotai";

import DefaultLayout from "../layouts/DefaultLayout";
import { Table } from "../components/shared";
import { StopLimitActions } from "../enums";
import BuyToken from "../components/partial/BuyToken";
import SellToken from "../components/partial/SellToken";
import useAuthentication from "../utils/useAuthentication";
import { ENZYME_KOVAN_GRAPH_API } from "../config/api";
import { reloadAutomatedStrategyHoldingsAtom } from "../atoms";

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

type Holdings = { id: string; [x: string]: any }[];

const AutomatedStrategy: React.FC = () => {
  const [, , authentication] = useAuthentication();
  const [vaultHoldings, setVaultHoldings] = useState<Holdings>([]);
  const [reload, setReload] = useAtom(reloadAutomatedStrategyHoldingsAtom);

  useEffect(() => {
    try {
      EnzymeBot.createFromInput(
        authentication.vaultAddress,
        authentication.privateKey
      ).then(async (res) => {
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
    if (reload) {
      try {
        EnzymeBot.createFromInput(
          authentication.vaultAddress,
          authentication.privateKey
        ).then(async (res) => {
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
    // eslint-disable-next-line
  }, [reload]);

  return (
    <DefaultLayout name="Automated Strategy">
      <Flex
        maxW="1000px"
        mt="40px"
        mx={{ base: "2rem", md: "auto" }}
        justifyContent={{ base: "center", xl: "initial" }}
      >
        <Box
          backgroundColor="accentCards"
          border="1px solid"
          borderColor="accentOutlines"
          padding="20px"
          p="2rem"
          borderRadius="8px"
          mr="20px"
        >
          <Tabs isFitted>
            <TabList>
              <Tab color="gray.400" _active={{ backgroudColor: "transparent" }}>
                Buy
              </Tab>
              <Tab color="gray.400" _active={{ backgroudColor: "transparent" }}>
                Sell
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <BuyToken />
              </TabPanel>
              <TabPanel>
                <SellToken />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Flex direction={{ base: "column", xl: "row" }} w="min-content">
          <Table
            rows={stopLimitRows}
            shownAs="stopLimitTable"
            mr={{ base: "0px", xl: "20px" }}
            mb={{ base: "20px", xl: "0px" }}
          />
          <Table rows={vaultHoldings} shownAs="vaultHoldingsTable" />
        </Flex>
      </Flex>
    </DefaultLayout>
  );
};

export default AutomatedStrategy;
