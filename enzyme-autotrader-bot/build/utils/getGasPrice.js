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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGasPrice = void 0;
const axios_1 = __importDefault(require("axios"));
function getGasPrice(maxWait) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get('https://ethgasstation.info/json/ethgasAPI.json');
            const data = response.data.gasPriceRange;
            const price = Object.keys(data).find((price) => parseFloat(data[price]) <= maxWait);
            return (price || response.data.fast) / 10;
        }
        catch (error) {
            throw new Error(`Failed to fetch gas price data: ${error}`);
        }
    });
}
exports.getGasPrice = getGasPrice;
