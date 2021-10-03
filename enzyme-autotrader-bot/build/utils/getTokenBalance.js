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
exports.getTokenBalance = void 0;
const protocol_1 = require("@enzymefinance/protocol");
const ethers_1 = require("ethers");
function getTokenBalance(vaultContract, token, network) {
    return __awaiter(this, void 0, void 0, function* () {
        //const provider = getProvider(network);
        let provider;
        if (network === 'MAINNET') {
            const node = 'https://mainnet.infura.io/v3/1d5ebf5899694a72a55198c3719c06e5';
            provider = new ethers_1.providers.JsonRpcProvider(node, network.toLowerCase());
        }
        else {
            const node = 'https://kovan.infura.io/v3/1e622323c17e434b937c3433a0e6da56';
            provider = new ethers_1.providers.JsonRpcProvider(node, network.toLowerCase());
        }
        const contract = new protocol_1.StandardToken(token, provider);
        return contract.balanceOf.args(vaultContract).call();
    });
}
exports.getTokenBalance = getTokenBalance;
