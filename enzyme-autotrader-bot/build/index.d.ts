import { EnzymeBot } from './EnzymeBot';
import { BigNumber } from 'ethers';
import { getPrice2 } from './utils/getPrice';
export declare const getDecimal: (bot: EnzymeBot) => void;
export declare const getPrice: typeof getPrice2;
export declare const getCurrentHoldings: (bot: EnzymeBot) => Promise<{
    amount: BigNumber;
    __typename?: "Asset" | undefined;
    symbol?: string | undefined;
    id?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    type?: import("./utils/subgraph/subgraph").AssetType | undefined;
    derivativeType?: import("./utils/subgraph/subgraph").Maybe<import("./utils/subgraph/subgraph").DerivativeType> | undefined;
    releases?: ({
        __typename?: "Release" | undefined;
    } & Pick<import("./utils/subgraph/subgraph").Release, "id">)[] | undefined;
    price?: import("./utils/subgraph/subgraph").Maybe<{
        __typename?: "AssetPrice" | undefined;
    } & Pick<import("./utils/subgraph/subgraph").AssetPrice, "price" | "timestamp">> | undefined;
    underlyingAsset?: import("./utils/subgraph/subgraph").Maybe<{
        __typename?: "Asset" | undefined;
    } & Pick<import("./utils/subgraph/subgraph").Asset, "symbol" | "id" | "name" | "decimals">> | undefined;
    uniswapV2PoolAssetDetails?: import("./utils/subgraph/subgraph").Maybe<{
        __typename?: "UniswapV2PoolAssetDetail" | undefined;
    } & {
        token0: {
            __typename?: "Asset" | undefined;
        } & Pick<import("./utils/subgraph/subgraph").Asset, "symbol" | "id" | "decimals">;
        token1: {
            __typename?: "Asset" | undefined;
        } & Pick<import("./utils/subgraph/subgraph").Asset, "symbol" | "id" | "decimals">;
    }> | undefined;
}[]>;
export declare const run: (bot: EnzymeBot, funcName: string, args: {
    tokenSell?: any;
    tokenBuy?: any;
    amount?: any;
    toBeSwappedInto?: string;
    priceLimit?: number;
}) => Promise<string | boolean>;
export declare const main: (inputFunction: string, bot: EnzymeBot, args: {
    liquidateTokens?: string[];
    rebalancedHoldings?: {
        symbol: string;
        amount: number;
    }[];
    tokenSell?: any;
    tokenBuy?: any;
    amount?: any;
    toBeSwappedInto?: string;
    priceLimit?: number;
}) => Promise<string | undefined>;
export declare const getERC20Tokens: (network?: 'KOVAN' | 'MAINNET') => Promise<({
    __typename?: "Asset" | undefined;
} & Pick<import("./utils/subgraph/subgraph").Asset, "symbol" | "id" | "name" | "decimals" | "type" | "derivativeType"> & {
    releases: ({
        __typename?: "Release" | undefined;
    } & Pick<import("./utils/subgraph/subgraph").Release, "id">)[];
    price?: import("./utils/subgraph/subgraph").Maybe<{
        __typename?: "AssetPrice" | undefined;
    } & Pick<import("./utils/subgraph/subgraph").AssetPrice, "price" | "timestamp">> | undefined;
    underlyingAsset?: import("./utils/subgraph/subgraph").Maybe<{
        __typename?: "Asset" | undefined;
    } & Pick<import("./utils/subgraph/subgraph").Asset, "symbol" | "id" | "name" | "decimals">> | undefined;
    uniswapV2PoolAssetDetails?: import("./utils/subgraph/subgraph").Maybe<{
        __typename?: "UniswapV2PoolAssetDetail" | undefined;
    } & {
        token0: {
            __typename?: "Asset" | undefined;
        } & Pick<import("./utils/subgraph/subgraph").Asset, "symbol" | "id" | "decimals">;
        token1: {
            __typename?: "Asset" | undefined;
        } & Pick<import("./utils/subgraph/subgraph").Asset, "symbol" | "id" | "decimals">;
    }> | undefined;
})[]>;
export { EnzymeBot };
