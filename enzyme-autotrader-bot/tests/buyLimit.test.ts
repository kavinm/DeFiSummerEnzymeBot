import { EnzymeBot } from '../src/EnzymeBot';


import { BigNumber, providers, utils, Wallet } from 'ethers';
const buyLimit = require('../src/EnzymeBot').buyLimit;
import 'mocha';

const assert = require('assert');

const chai = require('chai');
const internal = require('stream');

const expect = chai.expect;


// will test if 
describe('Buy Limit Function', function() {
    it('Buy token and limit token are not equal', async() => {
        const currentBot = await EnzymeBot.create('KOVAN');
        const result = await currentBot.buyLimit('WETH', 'USDC', 0)//.then(result => {assert.equal(result,'USDC')});
        assert.equal(result,'USDC');
    });

    it('token that will be swapped are the same', async() => {
        const currentBot = await EnzymeBot.create('KOVAN');
        const result = await currentBot.buyLimit('WETH', 'USDC', 0)
        assert.equal(result, 'WETH');
    })
});


describe ('Sell Limit Function', function() {
    it('Sell token and limit token should not be equal', async() => {
        const currentBot = await EnzymeBot.create('KOVAN');
        const result = await currentBot.sellLimit('WETH', 'USDC', 0)
        assert.equal(result,'USDC')
    })

    it('token that will be swapped are the same', async() => {
        const currentBot = await EnzymeBot.create('KOVAN');
        const result = await currentBot.sellLimit('WETH', 'USDC', 0)
        assert.equal(result,'WETH')
    })
});