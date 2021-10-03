"use strict";
// Gets the price of the token and returns it in USD
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrice2 = void 0;
const sdk_1 = require("./subgraph/sdk");
const axios_1 = __importDefault(require("axios"));
// filler function that is not being used ATM
// pass these your subgraph endpoint
// export async function getTokens(endpoint: string) {
//   const result = await gql(endpoint).assets();
//   return result;
// }hello
// named getPrice2 because there is another getPrice in EnzymeBot
//returns the token Object for given the  string of symbol
function getPrice2(endpoint, token) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield sdk_1.gql(endpoint).assets();
        const returnToken = result.assets.find((asset) => asset.symbol === token);
        let priceOfETH;
        //change this to mainnet api later on
        let res;
        //if the last character is n, must be kovan endpoint
        if (endpoint.slice(-1) === 'n') {
            res = yield axios_1.default.get('https://data.kovan.enzyme.finance/api/currency/list');
        }
        else {
            res = yield axios_1.default.get('https://data.enzyme.finance/api/currency/list');
        }
        priceOfETH = Number(res.data.data.find((d) => d.id === 'ETH').price.price);
        // use the price of USDC which is also in ETH to get the price in USD
        if ((returnToken === null || returnToken === void 0 ? void 0 : returnToken.type) === 'ETH' && priceOfETH !== NaN) {
            //const priceOfUSDC = Number(result.assets.find((asset) => asset.symbol === 'USDC')?.price?.price);
            let tokenPrice = Number((_b = (_a = result.assets.find((asset) => asset.symbol === token)) === null || _a === void 0 ? void 0 : _a.price) === null || _b === void 0 ? void 0 : _b.price) * priceOfETH;
            //console.log('This is the tokenPrice');
            //console.log(tokenPrice);
            return tokenPrice;
        }
        //if price is already in USD just return price
        if ((returnToken === null || returnToken === void 0 ? void 0 : returnToken.type) === 'USD') {
            return Number((_d = (_c = result.assets.find((asset) => asset.symbol === token)) === null || _c === void 0 ? void 0 : _c.price) === null || _d === void 0 ? void 0 : _d.price);
        }
    });
}
exports.getPrice2 = getPrice2;
