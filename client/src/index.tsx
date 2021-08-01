import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from './config/styles/theme';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme} resetCSS>
      <Router>
        <App />
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
