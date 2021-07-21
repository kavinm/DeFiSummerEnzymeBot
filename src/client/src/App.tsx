import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Connect } from './pages';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/connect">
        <Connect />
      </Route>
    </Switch>
  );
};

export default App;
