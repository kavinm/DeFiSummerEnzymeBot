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
exports.getToken = exports.getTokens = void 0;
const sdk_1 = require("./subgraph/sdk");
// pass these your subgraph endpoint
function getTokens(endpoint) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield sdk_1.gql(endpoint).assets();
        return result;
    });
}
exports.getTokens = getTokens;
function getToken(endpoint, assetProperty, assetPropertyValue) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield sdk_1.gql(endpoint).assets();
        return result.assets.find((asset) => asset[assetProperty] === assetPropertyValue);
    });
}
exports.getToken = getToken;
