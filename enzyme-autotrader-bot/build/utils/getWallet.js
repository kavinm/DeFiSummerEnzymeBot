"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWallet = void 0;
const ethers_1 = require("ethers");
function getWallet(key, provider) {
    return new ethers_1.Wallet(key, provider);
}
exports.getWallet = getWallet;
