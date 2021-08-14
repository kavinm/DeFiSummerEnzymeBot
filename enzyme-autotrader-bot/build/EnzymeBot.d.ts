import { ComptrollerLib } from '@enzymefinance/protocol';
import { BigNumber, providers, utils, Wallet } from 'ethers';
import { AssetsQuery, CurrentReleaseContractsQuery, VaultQuery } from './utils/subgraph/subgraph';
import { TokenBasics } from './utils/uniswap/getTradeDetails';
export declare class EnzymeBot {
    readonly network: 'KOVAN' | 'MAINNET';
    readonly contracts: CurrentReleaseContractsQuery;
    readonly tokens: AssetsQuery;
    readonly wallet: Wallet;
    readonly vaultAddress: string;
    readonly vault: VaultQuery;
    readonly provider: providers.JsonRpcProvider;
    readonly subgraphEndpoint: string;
    static create(network: 'KOVAN' | 'MAINNET'): Promise<EnzymeBot>;
    static createFromInput(inputVaultAddress?: string, privateKey?: string): Promise<EnzymeBot>;
    static staticCreateKovan(inputVaultAddress?: string): Promise<EnzymeBot>;
    private constructor();
    chooseRandomAsset(): Promise<({
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
    }) | undefined>;
    getHoldings(): Promise<(({
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
    }) | undefined)[]>;
    getPrice(buyToken: TokenBasics, sellToken: TokenBasics, sellTokenAmount: BigNumber): Promise<{
        path: string[];
        minIncomingAssetAmount: BigNumber;
        outgoingAssetAmount: BigNumber;
    }>;
    swapTokens(trade: {
        path: string[];
        minIncomingAssetAmount: BigNumber;
        outgoingAssetAmount: BigNumber;
    }): Promise<import("@enzymefinance/ethers").Send<(_extension: import("@enzymefinance/ethers").AddressLike, _actionId: import("ethers").BigNumberish, _callArgs: utils.BytesLike) => void, ComptrollerLib> | undefined>;
    getVaultValues(): Promise<number | undefined>;
    getHoldingsWithNumberAmounts(): Promise<{
        amount: number;
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
    }[] | undefined>;
    liquidate(vaultHolding: any, toBeSwappedTo: string): Promise<import("@enzymefinance/ethers").Send<(_extension: import("@enzymefinance/ethers").AddressLike, _actionId: import("ethers").BigNumberish, _callArgs: utils.BytesLike) => void, ComptrollerLib> | undefined>;
    CreatesRebalanceHoldings(tokensArray?: {
        symbol: string;
        amount: number;
    }[]): Promise<any[]>;
    IfHoldingIsEqual(currentPortfolio: any[], rebalancedPortfolio: any[]): Promise<boolean>;
    addHolding(sellTokenSymbol: string, buyTokenSymbol: string, tokenPriceLimit: number): Promise<import("@enzymefinance/ethers").Send<(_extension: import("@enzymefinance/ethers").AddressLike, _actionId: import("ethers").BigNumberish, _callArgs: utils.BytesLike) => void, ComptrollerLib> | undefined>;
    buyLimit(sellTokenSymbol: string, buyTokenSymbol: string, tokenPriceLimit: number): Promise<import("@enzymefinance/ethers").Send<(_extension: import("@enzymefinance/ethers").AddressLike, _actionId: import("ethers").BigNumberish, _callArgs: utils.BytesLike) => void, ComptrollerLib> | undefined>;
    sellLimit(sellTokenSymbol: string, buyTokenSymbol: string, tokenPriceLimit: number): Promise<import("@enzymefinance/ethers").Send<(_extension: import("@enzymefinance/ethers").AddressLike, _actionId: import("ethers").BigNumberish, _callArgs: utils.BytesLike) => void, ComptrollerLib> | undefined>;
    swapWithAmount(sellTokenSymbol: string, buyTokenSymbol: string, tokenAmount: BigNumber): Promise<import("@enzymefinance/ethers").Send<(_extension: import("@enzymefinance/ethers").AddressLike, _actionId: import("ethers").BigNumberish, _callArgs: utils.BytesLike) => void, ComptrollerLib> | undefined>;
}
