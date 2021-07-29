/*
A testing suite to verify the createsRebalancedHoldings function
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

describe('Creates rebalanced holdings', () => {
  //describe('Creates rebalanced holdings', () => {

  //create symbols and amounts arrays to verify against created holdings
  const symbols: string[] = [];
  const amounts: BigNumber[] = [];

  for (let token of tokensArray) {
    symbols.push(token.symbol);
    amounts.push(BigNumber.from(token.amount));
  }

  console.log;

  it('should include the correct token symbols in rebalanced holdings ', async () => {
    const currentBot = await EnzymeBot.create('KOVAN');

    const rebalancedHoldings = await currentBot.CreatesRebalanceHoldings(tokensArray);
    for (let holding of rebalancedHoldings) {
      expect(symbols.includes(holding.symbol)).to.be.true;
    }
  });

  it('should include the correct token amounts in rebalanced holdings ', async () => {
    const currentBot = await EnzymeBot.create('KOVAN');
    const rebalancedHoldings = await currentBot.CreatesRebalanceHoldings(tokensArray);
    for (let holding of rebalancedHoldings) {
      //amount is converted back into scaled down form
      const holdingAmountReduced = holding.amount.div(BigNumber.from(10 ** holding.decimals));

      expect(amounts.some((amount) => amount.eq(holdingAmountReduced))).to.be.true;
    }
  });

  it('should include the correct number of holdings', async () => {
    const currentBot = await EnzymeBot.create('KOVAN');
    const rebalancedHoldings = await currentBot.CreatesRebalanceHoldings(tokensArray);
    expect(rebalancedHoldings.length).to.equal(tokensArray.length);
  });
});
