import { BigNumber } from 'ethers';
export interface TokenBasics {
    id: string;
    decimals: number;
    symbol: string;
    name: string;
}
export declare function getTradeDetails(network: 'KOVAN' | 'MAINNET', sellToken: TokenBasics, buyToken: TokenBasics, sellTokenAmount: BigNumber): Promise<{
    path: string[];
    minIncomingAssetAmount: BigNumber;
    outgoingAssetAmount: BigNumber;
}>;
