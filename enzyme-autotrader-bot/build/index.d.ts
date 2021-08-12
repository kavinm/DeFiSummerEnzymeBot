import { EnzymeBot } from './EnzymeBot';
import { BigNumber } from 'ethers';
export declare const getDecimal: (bot: EnzymeBot) => void;
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
export declare const run: (bot: EnzymeBot, funcName: string, tokenSell?: any, tokenBuy?: any, amount?: any) => Promise<boolean>;
export declare const main: (inputFunction: string) => Promise<void>;
export declare const greetUser: (user: string) => string;
export declare const goodbyeUser: (user: string) => string;
export { EnzymeBot };
