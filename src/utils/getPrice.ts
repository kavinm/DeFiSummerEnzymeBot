// Gets the price of the token and returns it in USD

import { gql } from './subgraph/sdk';
import { AssetBlacklistSetting_OrderBy } from './subgraph/subgraph';

// filler function that is not being used ATM
// pass these your subgraph endpoint

/*
export async function getTokens(endpoint: string) {
  const result = await gql(endpoint).assets();
  return result;
}
*/

export async function getPrice2(endpoint: string, token: string) {
  const result = await gql(endpoint).assets();
  const returnToken =result.assets.find((asset) => asset.symbol === token);

  // returns the price of the coin and divides it by the price of ETH to get price in USD. 
  // (for ETH we need to pull price from https://data.kovan.enzyme.finance/api/currency/list)
  if (returnToken?.type ==='ETH') {
      const priceOfEth = Number(result.assets.find((asset) => asset.symbol === 'WETH')?.price?.price);
      return Number(result.assets.find((asset) => asset.symbol === token)?.price?.price) * priceOfEth;
  }
  // returns price of the token
  if (returnToken?.type ==='USD') {
    return Number(result.assets.find((asset) => asset.symbol === token)?.price?.price);
    }
}

