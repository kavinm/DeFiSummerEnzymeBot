import { useCallback, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useAtom } from "jotai";
import uuid from "react-uuid";

import Connect from "./pages/Connect";
import BuySellLimit from "./pages/BuySellLimit";
import Liquidate from "./pages/Liquidate";
import RebalancePortfolio from "./pages/RebalancePortfolio";
import useAuthentication from "./utils/useAuthentication";
import { EnzymeBot, getERC20Tokens, getPrice } from "enzyme-autotrader-bot";
import {
  availableTokensAtom,
  reloadBuySellLimitHoldingsAtom,
  vaultHoldingsAtom,
} from "./atoms";
import { ENZYME_KOVAN_GRAPH_API } from "./config/api";

const App: React.FC = () => {
  const history = useHistory();
  const [isAuthenticated] = useAuthentication();
  const [, setVaultHoldings] = useAtom(vaultHoldingsAtom);
  const [, setAvailableTokens] = useAtom(availableTokensAtom);
  const [, , authentication] = useAuthentication();

  const [reload, setReload] = useAtom(reloadBuySellLimitHoldingsAtom);

  const getHoldings = useCallback(async () => {
    if (authentication.vaultAddress && authentication.privateKey) {
      try {
        const bot = await EnzymeBot.createFromInput(
          authentication.vaultAddress,
          authentication.privateKey
        );
        const holdingsRes = await bot.getHoldingsWithNumberAmounts();
        const holdingsAmounts =
          holdingsRes?.reduce((acc, curr) => acc + curr.amount, 0) || 0;
        const holdings = await Promise.all(
          holdingsRes?.map(async (h) => {
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
      } catch (error) {
        console.error(error);
      }
    }
  }, [
    authentication.vaultAddress,
    authentication.privateKey,
    setVaultHoldings,
  ]);

  const getAvailableTokens = useCallback(async () => {
    if (authentication.vaultAddress && authentication.privateKey) {
      const tokens = await getERC20Tokens("KOVAN");
      const opts = tokens.map((r) => ({ value: r.symbol, label: r.symbol }));
      setAvailableTokens(opts);
    }
  }, [
    authentication.vaultAddress,
    authentication.privateKey,
    setAvailableTokens,
  ]);

  useEffect(() => {
    if (isAuthenticated && history.location.pathname === "/") {
      history.replace("/buy-sell-limit");
    } else if (!isAuthenticated && history.location.pathname !== "/") {
      history.replace("/");
    }
  }, [isAuthenticated, history]);

  useEffect(() => {
    getHoldings();
  }, [getHoldings]);

  useEffect(() => {
    getAvailableTokens();
  }, [getAvailableTokens]);

  useEffect(() => {
    if (reload) {
      getHoldings();
      getAvailableTokens();
      setTimeout(() => {
        setReload(false);
      }, 300);
    }
    // eslint-disable-next-line
  }, [reload]);

  return (
    <Switch>
      <Route exact path="/">
        <Connect />
      </Route>
      <Route exact path="/buy-sell-limit">
        <BuySellLimit />
      </Route>
      <Route exact path="/liquidate">
        <Liquidate />
      </Route>
      <Route exact path="/rebalance-portfolio">
        <RebalancePortfolio />
      </Route>
    </Switch>
  );
};

export default App;
