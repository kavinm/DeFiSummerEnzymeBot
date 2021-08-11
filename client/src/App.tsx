import { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import Connect from "./pages/Connect";
import AutomatedStrategy from "./pages/AutomatedStrategy";
import Liquidate from "./pages/Liquidate";
import RebalancePortfolio from "./pages/RebalancePortfolio";
import useAuthentication from "./utils/useAuthentication";

const App: React.FC = () => {
  const history = useHistory();
  const [isAuthenticated] = useAuthentication();

  useEffect(() => {
    if (isAuthenticated && history.location.pathname === "/") {
      history.replace("/automated-strategy");
    } else if (!isAuthenticated && history.location.pathname !== "/") {
      history.replace("/");
    }
  }, [isAuthenticated, history]);

  return (
    <Switch>
      <Route exact path="/">
        <Connect />
      </Route>
      <Route exact path="/automated-strategy">
        <AutomatedStrategy />
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
