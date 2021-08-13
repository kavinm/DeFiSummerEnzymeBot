"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTradeDetails = void 0;
const sdk_1 = require("@uniswap/sdk");
const ethers_1 = require("ethers");
function getTradeDetails(network, sellToken, buyToken, sellTokenAmount) {
    return __awaiter(this, void 0, void 0, function* () {
        if (network === 'KOVAN') {
            const path = [sellToken.id, buyToken.id];
            const minIncomingAssetAmount = ethers_1.utils
                .parseUnits('1', buyToken.decimals)
                .mul(ethers_1.BigNumber.from(10).pow(buyToken.decimals))
                .div(ethers_1.BigNumber.from(10).pow(buyToken.decimals * 2 - 1));
            const outgoingAssetAmount = sellTokenAmount;
            return {
                path,
                minIncomingAssetAmount,
                outgoingAssetAmount,
            };
        }
        const oneTokenIsWeth = ethers_1.utils.getAddress(sellToken.id).toLowerCase() === sdk_1.WETH[sdk_1.ChainId.MAINNET].address.toLowerCase() ||
            ethers_1.utils.getAddress(buyToken.id).toLowerCase() === sdk_1.WETH[sdk_1.ChainId.MAINNET].address.toLowerCase();
        const outgoingToken = new sdk_1.Token(sdk_1.ChainId[network], ethers_1.utils.getAddress(sellToken.id), sellToken.decimals, sellToken.symbol, sellToken.name);
        const incomingToken = new sdk_1.Token(sdk_1.ChainId[network], ethers_1.utils.getAddress(buyToken.id), buyToken.decimals, buyToken.symbol, buyToken.name);
        let route = null;
        if (oneTokenIsWeth) {
            const pair0 = yield sdk_1.Fetcher.fetchPairData(outgoingToken, incomingToken);
            route = new sdk_1.Route([pair0], outgoingToken);
        }
        else {
            const pair1 = yield sdk_1.Fetcher.fetchPairData(outgoingToken, sdk_1.WETH[outgoingToken.chainId]);
            const pair2 = yield sdk_1.Fetcher.fetchPairData(sdk_1.WETH[incomingToken.chainId], incomingToken);
            route = new sdk_1.Route([pair1, pair2], outgoingToken);
        }
        const tokenOutAmount = new sdk_1.TokenAmount(outgoingToken, sellTokenAmount.toString());
        const trade = new sdk_1.Trade(route, tokenOutAmount, sdk_1.TradeType.EXACT_INPUT);
        const outgoingAssetAmount = ethers_1.utils.parseUnits(trade.inputAmount.toFixed(trade.route.input.decimals), trade.route.input.decimals);
        const minIncomingAssetAmount = ethers_1.utils
            .parseUnits(trade.outputAmount.toFixed(trade.route.output.decimals), trade.route.output.decimals)
            .mul(98)
            .div(100);
        const path = trade.route.path.map((token) => token.address);
        return { path, outgoingAssetAmount, minIncomingAssetAmount };
    });
}
exports.getTradeDetails = getTradeDetails;
