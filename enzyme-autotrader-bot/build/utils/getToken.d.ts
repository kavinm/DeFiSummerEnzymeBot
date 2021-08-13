export declare function getTokens(endpoint: string): Promise<import("./subgraph/subgraph").AssetsQuery>;
export declare function getToken(endpoint: string, assetProperty: 'symbol' | 'id', assetPropertyValue: string): Promise<({
    __typename?: "Asset" | undefined;
} & Pick<import("./subgraph/subgraph").Asset, "symbol" | "id" | "name" | "decimals" | "type" | "derivativeType"> & {
    releases: ({
        __typename?: "Release" | undefined;
    } & Pick<import("./subgraph/subgraph").Release, "id">)[];
    price?: import("./subgraph/subgraph").Maybe<{
        __typename?: "AssetPrice" | undefined;
    } & Pick<import("./subgraph/subgraph").AssetPrice, "price" | "timestamp">> | undefined;
    underlyingAsset?: import("./subgraph/subgraph").Maybe<{
        __typename?: "Asset" | undefined;
    } & Pick<import("./subgraph/subgraph").Asset, "symbol" | "id" | "name" | "decimals">> | undefined;
    uniswapV2PoolAssetDetails?: import("./subgraph/subgraph").Maybe<{
        __typename?: "UniswapV2PoolAssetDetail" | undefined;
    } & {
        token0: {
            __typename?: "Asset" | undefined;
        } & Pick<import("./subgraph/subgraph").Asset, "symbol" | "id" | "decimals">;
        token1: {
            __typename?: "Asset" | undefined;
        } & Pick<import("./subgraph/subgraph").Asset, "symbol" | "id" | "decimals">;
    }> | undefined;
}) | undefined>;
