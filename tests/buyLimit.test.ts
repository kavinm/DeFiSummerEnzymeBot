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
});