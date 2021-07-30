import { EnzymeBot } from '../src/EnzymeBot';
import { getTokenBalance } from '../src/utils/getTokenBalance';

import { BigNumber, providers, utils, Wallet } from 'ethers';
const buyLimit = require('../src/EnzymeBot').buyLimit;
import 'mocha';

const assert = require('assert');

const chai = require('chai');
const internal = require('stream');

const expect = chai.expect;

const test3 = {
    id:'0x0', //sellingToken.id as string,
    decimals: 18, //sellingToken.decimals as number,
    price: { price: '100', timestamp: '1627610520' },
    symbol:'ZOUV', //sellingToken.symbol as string,
    name:'zou token' //sellingToken.name as string,
  }

const expected = {
    
        decimals: 18,
        derivativeType: null,
        id: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
        name: 'Wrapped Ether',
        price: { price: '1', timestamp: '1627610520' },
        releases: [ [Object], [Object] ],
        symbol: 'WETH',
        type: 'ETH',
        underlyingAsset: null,
        uniswapV2PoolAssetDetails: null
      
}


describe('Buy Limit Function', function() {
    it('1) pass empty values', async() => {
        
        const currentBot = await EnzymeBot.create('KOVAN');
        const result = await currentBot.liquidate('')//.then(result => {assert.equal(result,'USDC')});
        assert.equal(result,'USDC');
    });

    it('2) pass random arbitrary number', async() => {
        const currentBot = await EnzymeBot.create('KOVAN');
        const result = await currentBot.liquidate('')
        assert.equal(result, 'WETH');
    })

    it('3) pass unexisting coin as information', async() => {
        
        const currentBot = await EnzymeBot.create('KOVAN');
        const result = await currentBot.liquidate(expected)//.then(result => {assert.equal(result,'USDC')});
        assert.equal(result,'USDC');
    });

    it('4) pass all correct except for', async() => {
        
        const currentBot = await EnzymeBot.create('KOVAN');
        const result = await currentBot.liquidate(expected)//.then(result => {assert.equal(result,'USDC')});
        assert.equal(result,'USDC');
    });
});
