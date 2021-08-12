export declare function gql(endpoint: string): {
    assets(variables?: import("./subgraph").Exact<{
        [key: string]: never;
    }> | undefined, requestHeaders?: (Record<string, string> | import("graphql-request/dist/types.dom").Headers | string[][]) | undefined): Promise<import("./subgraph").AssetsQuery>;
    currentReleaseContracts(variables?: import("./subgraph").Exact<{
        [key: string]: never;
    }> | undefined, requestHeaders?: (Record<string, string> | import("graphql-request/dist/types.dom").Headers | string[][]) | undefined): Promise<import("./subgraph").CurrentReleaseContractsQuery>;
    vault(variables: import("./subgraph").Exact<{
        id: string;
    }>, requestHeaders?: (Record<string, string> | import("graphql-request/dist/types.dom").Headers | string[][]) | undefined): Promise<import("./subgraph").VaultQuery>;
};
