// Gets the price of the token and returns it in USD

import { gql } from './subgraph/sdk';
import { AssetBlacklistSetting_OrderBy } from './subgraph/subgraph';
import axios from 'axios';

// filler function that is not being used ATM
// pass these your subgraph endpoint
// export async function getTokens(endpoint: string) {
//   const result = await gql(endpoint).assets();
//   return result;
// }hello

// named getPrice2 because there is another getPrice in EnzymeBot
//returns the token Object for given the  string of symbol
export async function getPrice2(endpoint: string, token: string) {
  const result = await gql(endpoint).assets();
  const returnToken = result.assets.find((asset) => asset.symbol === token);
  let priceOfETH: number;

  //change this to mainnet api later on
  const res = await axios.get('https://data.kovan.enzyme.finance/api/currency/list');

  priceOfETH = Number(res.data.data.find((d: any) => d.id === 'ETH').price.price);
  // use the price of USDC which is also in ETH to get the price in USD
  if (returnToken?.type === 'ETH' && priceOfETH !== NaN) {
    //const priceOfUSDC = Number(result.assets.find((asset) => asset.symbol === 'USDC')?.price?.price);

    let tokenPrice = Number(result.assets.find((asset) => asset.symbol === token)?.price?.price) * priceOfETH;
    console.log('This is the tokenPrice');
    console.log(tokenPrice);
    return tokenPrice;
  }
  //if price is already in USD just return price
  if (returnToken?.type === 'USD') {
    return Number(result.assets.find((asset) => asset.symbol === token)?.price?.price);
  }
}