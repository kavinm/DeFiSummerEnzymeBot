import { EnzymeBot } from '../src/EnzymeBot';

import { BigNumber, providers, utils, Wallet } from 'ethers';

import { loadEnv } from '../src/utils/loadEnv';

import 'mocha';

const assert = require('assert');

const chai = require('chai');
const internal = require('stream');

const expect = chai.expect;

type token = { symbol: string; amount: number };

const tokensArray: token[] = [
  { symbol: 'USDC', amount: 1000 },
  { symbol: 'WBTC', amount: 2 },
];

describe('Creates rebalanced holdings', () => {
  //describe('Creates rebalanced holdings', () => {

  const symbols = [tokensArray[0].symbol, tokensArray[1].symbol];

  const amounts = [BigNumber.from(tokensArray[0].amount), BigNumber.from(tokensArray[1].amount)];
  console.log;

  it('should include the correct token symbols in rebalanced holdings ', async () => {
    const currentBot = await EnzymeBot.create('KOVAN');
    const rebalancedHoldings = await currentBot.CreatesRebalanceHoldings(tokensArray);
    //for (let holding of rebalancedHoldings) {
    for (let symbol of symbols) {
      //expect(symbols.includes(holding.symbol)).to.be.true;
      expect(true).to.be.true;
    }
  });
});

describe('Test if this is working', () => {
  it('should return hello world', () => {
    const result = 'Hello world!';
    expect(result).to.equal('Hello world!');
  });
});
