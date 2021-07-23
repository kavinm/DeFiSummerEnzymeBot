import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Connect from './pages/Connect';
import AutomatedStrategy from './pages/AutomatedStrategy';
import Liquidate from './pages/Liquidate';
import RebalancePortfolio from './pages/RebalancePortfolio';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/connect">
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
