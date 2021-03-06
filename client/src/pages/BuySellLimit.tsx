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
import { useAtom } from "jotai";

import DefaultLayout from "../layouts/DefaultLayout";
import { Table } from "../components/shared";
import { StopLimitActions } from "../enums";
import BuyToken from "../components/partial/BuyToken";
import SellToken from "../components/partial/SellToken";
import { vaultHoldingsAtom } from "../atoms";

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

const BuySellLimit: React.FC = () => {
  const [vaultHoldings] = useAtom(vaultHoldingsAtom);

  return (
    <DefaultLayout name="Buy-Sell Limit">
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
            tempBasisRows={vaultHoldings}
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

export default BuySellLimit;
