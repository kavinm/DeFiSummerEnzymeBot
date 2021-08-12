"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProvider = void 0;
const ethers_1 = require("ethers");
const loadEnv_1 = require("./loadEnv");
function getProvider(network) {
    const node = loadEnv_1.loadEnv(`${network}_NODE_ENDPOINT`);
    return new ethers_1.providers.JsonRpcProvider(node, network.toLowerCase());
}
exports.getProvider = getProvider;
