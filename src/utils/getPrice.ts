import { gql } from './subgraph/sdk';
import { AssetBlacklistSetting_OrderBy } from './subgraph/subgraph';

// pass these your subgraph endpoint
export async function getTokens(endpoint: string) {
  const result = await gql(endpoint).assets();
  return result;
}

export async function getPrice2(endpoint: string, token: string) {
  const result = await gql(endpoint).assets();
  const returnToken =result.assets.find((asset) => asset.symbol === token);
  if (returnToken?.type ==='ETH') {
      const priceOfEth = Number(result.assets.find((asset) => asset.symbol === 'WETH')?.price?.price);
      return Number(result.assets.find((asset) => asset.symbol === token)?.price?.price) * priceOfEth;
  }
  if (returnToken?.type ==='USD') {
    return Number(result.assets.find((asset) => asset.symbol === token)?.price?.price);
    }
}

