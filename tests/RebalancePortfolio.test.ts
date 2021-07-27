import { EnzymeBot } from '../src/EnzymeBot';

import { BigNumber, providers, utils, Wallet } from 'ethers';

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
      for (let symbol of symbols) {
        expect(symbols.includes(holding.symbol)).to.be.true;
        //expect(true).to.be.true;
      }
    }
  });

  it('should include the correct token amounts in rebalanced holdings ', async () => {
    const currentBot = await EnzymeBot.create('KOVAN');
    console.log('These are the amounts' + amounts);
    const rebalancedHoldings = await currentBot.CreatesRebalanceHoldings(tokensArray);
    for (let holding of rebalancedHoldings) {
      for (let amount of amounts) {
        expect(amounts.includes(holding.amount)).to.be.true;
        //expect(true).to.be.true;
      }
    }
  });
});

describe('Test if this is working', () => {
  it('should return hello world', () => {
    const result = 'Hello world!';
    expect(result).to.equal('Hello world!');
  });
});
