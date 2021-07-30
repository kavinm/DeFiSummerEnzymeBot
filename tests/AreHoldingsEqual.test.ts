/*
A testing suite to verify the AreHoldingsEqual function
*/

import { EnzymeBot } from '../src/EnzymeBot';

import { BigNumber, providers, utils, Wallet } from 'ethers';

import 'mocha';

const assert = require('assert');

const chai = require('chai');
const internal = require('stream');

const expect = chai.expect;

type token = { symbol: string; amount: number };

//input for CreatesRebalancedHoldings
const tokensArray: token[] = [
  { symbol: 'USDC', amount: 1000 },
  { symbol: 'WBTC', amount: 2 },
];

const lowerValueTokensArray: token[] = [
  { symbol: 'USDC', amount: 997 },
  { symbol: 'WBTC', amount: 2 },
];

describe('Checks if holdings are equal', () => {
  it('should return true when the holdings are the same', async () => {
    const currentBot = await EnzymeBot.create('KOVAN');

    const holdings1 = await currentBot.CreatesRebalanceHoldings(tokensArray);
    const holdings2 = await currentBot.CreatesRebalanceHoldings(tokensArray);
    const boolValue = await currentBot.IfHoldingIsEqual(holdings1, holdings2);
    expect(boolValue).to.be.true;
  });

  it('should return true when holdings are within 5%, lower bound', async () => {
    const currentBot = await EnzymeBot.create('KOVAN');

    const holdings1 = await currentBot.CreatesRebalanceHoldings(tokensArray);
    const holdings2 = await currentBot.CreatesRebalanceHoldings(lowerValueTokensArray);
    const boolValue = await currentBot.IfHoldingIsEqual(holdings1, holdings2);
    expect(boolValue).to.be.true;
  });
});
