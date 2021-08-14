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
exports.EnzymeBot = void 0;
const protocol_1 = require("@enzymefinance/protocol");
const ethers_1 = require("ethers");
const getDeployment_1 = require("./utils/getDeployment");
const getProvider_1 = require("./utils/getProvider");
const getToken_1 = require("./utils/getToken");
const getTokenBalance_1 = require("./utils/getTokenBalance");
const getVault_1 = require("./utils/getVault");
const getWallet_1 = require("./utils/getWallet");
const loadEnv_1 = require("./utils/loadEnv");
const getPrice_1 = require("./utils/getPrice");
const getTradeDetails_1 = require("./utils/uniswap/getTradeDetails");
class EnzymeBot {
    constructor(network, contracts, tokens, wallet, vaultAddress, vault, provider, subgraphEndpoint) {
        this.network = network;
        this.contracts = contracts;
        this.tokens = tokens;
        this.wallet = wallet;
        this.vaultAddress = vaultAddress;
        this.vault = vault;
        this.provider = provider;
        this.subgraphEndpoint = subgraphEndpoint;
    }
    static create(network) {
        return __awaiter(this, void 0, void 0, function* () {
            const subgraphEndpoint = network === 'MAINNET' ? loadEnv_1.loadEnv('MAINNET_SUBGRAPH_ENDPOINT') : loadEnv_1.loadEnv('KOVAN_SUBGRAPH_ENDPOINT');
            const key = network === 'MAINNET' ? loadEnv_1.loadEnv('MAINNET_PRIVATE_KEY') : loadEnv_1.loadEnv('KOVAN_PRIVATE_KEY');
            const contracts = yield getDeployment_1.getDeployment(subgraphEndpoint);
            const tokens = yield getToken_1.getTokens(subgraphEndpoint);
            const provider = getProvider_1.getProvider(network);
            const wallet = getWallet_1.getWallet(key, provider);
            const vaultAddress = loadEnv_1.loadEnv('ENZYME_VAULT_ADDRESS');
            const vault = yield getVault_1.getVaultInfo(subgraphEndpoint, vaultAddress);
            return new this(network, contracts, tokens, wallet, vaultAddress, vault, provider, subgraphEndpoint);
        });
    }
    static createFromInput(inputVaultAddress, privateKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const network = 'KOVAN';
            const subgraphEndpoint = 'https://api.thegraph.com/subgraphs/name/enzymefinance/enzyme-kovan';
            const key = privateKey;
            const contracts = yield getDeployment_1.getDeployment(subgraphEndpoint);
            const tokens = yield getToken_1.getTokens(subgraphEndpoint);
            const node = 'https://kovan.infura.io/v3/1e622323c17e434b937c3433a0e6da56';
            const provider = new ethers_1.providers.JsonRpcProvider(node, network.toLowerCase());
            const wallet = getWallet_1.getWallet(key, provider);
            const vaultAddress = inputVaultAddress;
            const vault = yield getVault_1.getVaultInfo(subgraphEndpoint, vaultAddress);
            return new this(network, contracts, tokens, wallet, vaultAddress || '0x6221e604a94143798834faed4788687aa37aaf9a', vault, provider, subgraphEndpoint);
        });
    }
    static staticCreateKovan(inputVaultAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const network = 'KOVAN';
            const subgraphEndpoint = 'https://api.thegraph.com/subgraphs/name/enzymefinance/enzyme-kovan';
            const key = 'b2d124d83167fc688384f325e5bad20bdbdf6d87a63fc27747a3286871804ae2';
            const contracts = yield getDeployment_1.getDeployment(subgraphEndpoint);
            const tokens = yield getToken_1.getTokens(subgraphEndpoint);
            const node = 'https://kovan.infura.io/v3/1e622323c17e434b937c3433a0e6da56';
            const provider = new ethers_1.providers.JsonRpcProvider(node, network.toLowerCase());
            const wallet = getWallet_1.getWallet(key, provider);
            const vaultAddress = inputVaultAddress || '0x6221e604a94143798834faed4788687aa37aaf9a';
            const vault = yield getVault_1.getVaultInfo(subgraphEndpoint, vaultAddress || '0x6221e604a94143798834faed4788687aa37aaf9a');
            return new this(network, contracts, tokens, wallet, vaultAddress || '0x6221e604a94143798834faed4788687aa37aaf9a', vault, provider, subgraphEndpoint);
        });
    }
    chooseRandomAsset() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const release = (_a = this.vault.fund) === null || _a === void 0 ? void 0 : _a.release.id;
            if (!release) {
                return undefined;
            }
            const assets = this.tokens.assets.filter((asset) => !asset.derivativeType);
            const releaseAssets = assets.filter((asset) => asset.releases.map((innerRelease) => innerRelease.id).includes(release));
            if (!releaseAssets || releaseAssets.length === 0) {
                return undefined;
            }
            const length = releaseAssets.length;
            const random = Math.floor(Math.random() * length);
            return releaseAssets[random];
        });
    }
    getHoldings() {
        return __awaiter(this, void 0, void 0, function* () {
            const vault = new protocol_1.VaultLib(this.vaultAddress, this.wallet);
            //const vaultAddy: string = '0xa731eef1d7687e0cf23fa7d83a7501a142b929fa';
            //const vault = new VaultLib(vaultAddy, this.wallet);
            const holdings = yield vault.getTrackedAssets();
            return Promise.all(holdings.map((item) => getToken_1.getToken(this.subgraphEndpoint, 'id', item.toLowerCase())));
        });
    }
    getPrice(buyToken, sellToken, sellTokenAmount) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield getTradeDetails_1.getTradeDetails(this.network, sellToken, buyToken, sellTokenAmount);
            return details;
        });
    }
    swapTokens(trade) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            const adapter = (_b = (_a = this.contracts.network) === null || _a === void 0 ? void 0 : _a.currentRelease) === null || _b === void 0 ? void 0 : _b.uniswapV2Adapter;
            const integrationManager = (_d = (_c = this.contracts.network) === null || _c === void 0 ? void 0 : _c.currentRelease) === null || _d === void 0 ? void 0 : _d.integrationManager;
            const comptroller = (_e = this.vault.fund) === null || _e === void 0 ? void 0 : _e.accessor.id;
            if (!adapter || !integrationManager || !comptroller) {
                console.log('Missing a contract address. Uniswap Adapter: ', adapter, ' Integration Manager: ', integrationManager);
                return;
            }
            const takeOrderArgs = protocol_1.uniswapV2TakeOrderArgs({
                path: trade.path,
                minIncomingAssetAmount: trade.minIncomingAssetAmount,
                outgoingAssetAmount: trade.outgoingAssetAmount,
            });
            const callArgs = protocol_1.callOnIntegrationArgs({
                adapter,
                selector: protocol_1.takeOrderSelector,
                encodedCallArgs: takeOrderArgs,
            });
            const contract = new protocol_1.ComptrollerLib(comptroller, this.wallet);
            console.log(typeof contract.callOnExtension.args(integrationManager, protocol_1.IntegrationManagerActionId.CallOnIntegration, callArgs));
            return contract.callOnExtension.args(integrationManager, protocol_1.IntegrationManagerActionId.CallOnIntegration, callArgs);
        });
    }
    getVaultValues() {
        return __awaiter(this, void 0, void 0, function* () {
            //get holdings of vault
            const vaultHoldings = yield this.getHoldings();
            // if you have no holdings, return
            if (vaultHoldings.length === 0) {
                console.log('Your fund has no assets.');
                return;
            }
            //makes an amount array of numbers from getToken
            const holdingsAmounts = yield Promise.all(vaultHoldings.map((holding) => getTokenBalance_1.getTokenBalance(this.vaultAddress, holding.id, this.network)));
            // combine holding token data with amounts
            const holdingsWithAmounts = vaultHoldings.map((item, index) => {
                return Object.assign(Object.assign({}, item), { amount: holdingsAmounts[index] });
            });
            let totalValue = 0;
            for (let holding of holdingsWithAmounts) {
                let decimals = holding.decimals;
                let DecimalAmount = parseInt(holding.amount._hex, 16);
                let amount = DecimalAmount / Math.pow(10, decimals);
                let priceOfCoin = yield getPrice_1.getPrice2(this.subgraphEndpoint, holding.symbol);
                let value = amount * priceOfCoin;
                // console.log(value);
                totalValue += value;
            }
            //console.log(totalValue);
            return totalValue;
        });
    }
    //will return the holdings with a number amount instead of big number
    getHoldingsWithNumberAmounts() {
        return __awaiter(this, void 0, void 0, function* () {
            const vaultHoldings = yield this.getHoldings();
            // if you have no holdings, return
            if (vaultHoldings.length === 0) {
                console.log('Your fund has no assets.');
                return;
            }
            //makes an amount array of numbers from getToken
            const holdingsAmounts = yield Promise.all(vaultHoldings.map((holding) => getTokenBalance_1.getTokenBalance(this.vaultAddress, holding.id, this.network)));
            const holdingsWithAmounts = vaultHoldings.map((item, index) => {
                return Object.assign(Object.assign({}, item), { amount: holdingsAmounts[index] });
            });
            const decimalAmounts = [];
            for (let holding of holdingsWithAmounts) {
                let decimals = holding.decimals;
                let decimalAmount = parseInt(holding.amount._hex, 16);
                let amount = decimalAmount / Math.pow(10, decimals);
                decimalAmounts.push(amount);
            }
            // combine holding token data with amounts
            // const holdingsWithAmounts = vaultHoldings.map((item, index) => {
            //   return { ...item, amount: holdingsAmounts[index] };
            // });
            const holdingsWithNumberAmounts = vaultHoldings.map((item, index) => {
                return Object.assign(Object.assign({}, item), { amount: decimalAmounts[index] });
            });
            console.log(holdingsWithAmounts);
            return holdingsWithNumberAmounts;
        });
    }
    liquidate(vaultHolding, toBeSwappedTo) {
        return __awaiter(this, void 0, void 0, function* () {
            let liquidTokenSymbol = toBeSwappedTo;
            // // if you have no holdings, return
            // if (vaultHoldings.length === 0) {
            //   console.log('Your fund has no assets.');
            //   return;
            // }
            //this will be the token we are liquidating everything into
            const liquidToken = this.tokens.assets.find((asset) => !asset.derivativeType && asset.symbol === liquidTokenSymbol);
            const sellingToken = vaultHolding;
            //make sure you are not trying to swap the token with itself
            if (liquidToken.symbol === sellingToken.symbol) {
                return;
            }
            const swapTokensInput = yield this.getPrice({ id: liquidToken.id, decimals: liquidToken.decimals, symbol: liquidToken.symbol, name: liquidToken.name }, {
                id: sellingToken.id,
                decimals: sellingToken.decimals,
                symbol: sellingToken.symbol,
                name: sellingToken.name,
            }, sellingToken.amount);
            if (swapTokensInput) {
                return this.swapTokens(swapTokensInput); //.then(() => console.log('Done Liquidating'));
            }
            //}
        });
    }
    CreatesRebalanceHoldings(tokensArray = []) {
        return __awaiter(this, void 0, void 0, function* () {
            let tokens = [];
            const currentValue = yield this.getVaultValues();
            for (let token of tokensArray) {
                tokens.push(token);
            }
            let rebalancedHoldings = [];
            let rebalancedAmounts = [];
            for (let token of tokens) {
                //make and push token object for each token string
                const currentToken = this.tokens.assets.find((asset) => !asset.derivativeType && asset.symbol === token.symbol);
                rebalancedHoldings.push(currentToken);
                // make and get token amount with decimals in BigNumber form
                //let decimals: BigNumber = BigNumber.from(currentToken.decimals);
                //token.percentage = (token.percentage / 100) * currentValue!;
                const Hexstring = '0x' + (Number(token.amount.toFixed(currentToken.decimals)) * Math.pow(10, currentToken.decimals)).toString(16);
                let tokenAmount = ethers_1.BigNumber.from(Hexstring); //.mul(decimals);
                rebalancedAmounts.push(tokenAmount);
            }
            const RebalancedholdingsWithAmounts = rebalancedHoldings.map((item, index) => {
                return Object.assign(Object.assign({}, item), { amount: rebalancedAmounts[index] });
            });
            return RebalancedholdingsWithAmounts;
        });
    }
    IfHoldingIsEqual(currentPortfolio, rebalancedPortfolio) {
        return __awaiter(this, void 0, void 0, function* () {
            let currentTotalValue = 0;
            for (let holding of currentPortfolio) {
                let decimals = holding.decimals;
                let DecimalAmount = parseInt(holding.amount._hex, 16);
                let amount = DecimalAmount / Math.pow(10, decimals);
                let priceOfCoin = yield getPrice_1.getPrice2(this.subgraphEndpoint, holding.symbol);
                let value = amount * priceOfCoin;
                currentTotalValue += value;
            }
            let rebalancedtotalValue = 0;
            for (let holding of rebalancedPortfolio) {
                let decimals = holding.decimals;
                let DecimalAmount = parseInt(holding.amount._hex, 16);
                let amount = DecimalAmount / Math.pow(10, decimals);
                console.log('Amount: ' + amount + '\n' + 'Decimal Amount: ' + DecimalAmount);
                let priceOfCoin = yield getPrice_1.getPrice2(this.subgraphEndpoint, holding.symbol);
                let value = amount * priceOfCoin;
                console.log('Value: ' + value);
                rebalancedtotalValue += value;
            }
            console.log(currentTotalValue);
            console.log('-----------------');
            console.log(rebalancedtotalValue);
            //let fivePercent = (rebalancedtotalValue * 0.05);
            // allows trades within 5%
            const withinFivePercent = rebalancedtotalValue > currentTotalValue * 0.95 && rebalancedtotalValue <= currentTotalValue;
            const value = currentTotalValue === rebalancedtotalValue || withinFivePercent;
            if (value === false) {
                console.log('\n The amounts are not equal or within 5 percent \n');
            }
            return value;
        });
    }
    // use this function to add holdings
    addHolding(sellTokenSymbol, buyTokenSymbol, tokenPriceLimit) {
        return __awaiter(this, void 0, void 0, function* () {
            // gets the price of the wanted token
            let realTokenPrice = yield getPrice_1.getPrice2(this.subgraphEndpoint, buyTokenSymbol);
            //get holdings of vault
            const vaultHoldings2 = yield this.getHoldings();
            // if you have no holdings, return
            if (vaultHoldings2.length === 0) {
                console.log('Your fund has no assets.');
                return;
            }
            // define the buy token
            const buyingToken = this.tokens.assets.find((asset) => !asset.derivativeType && asset.symbol === buyTokenSymbol);
            //makes an amount array of numbers from getToken
            const holdingsAmounts2 = yield Promise.all(vaultHoldings2.map((holding) => getTokenBalance_1.getTokenBalance(this.vaultAddress, holding.id, this.network)));
            // combine holding token data with amounts
            const holdingsWithAmounts2 = vaultHoldings2.map((item, index) => {
                return Object.assign(Object.assign({}, item), { amount: holdingsAmounts2[index] });
            });
            // find the token you will sell by searching for largest token holding
            const sellingToken = holdingsWithAmounts2.find((asset) => !(asset === null || asset === void 0 ? void 0 : asset.derivativeType) && (asset === null || asset === void 0 ? void 0 : asset.symbol) === sellTokenSymbol);
            const hardCodedAmount = ethers_1.BigNumber.from('3'); // divide by 3 to swap
            // the first input token will be bought, the second will be sold
            // this will create the input needed for our swap
            const swapTokensInput = yield this.getPrice({ id: buyingToken.id, decimals: buyingToken.decimals, symbol: buyingToken.symbol, name: buyingToken.name }, {
                id: sellingToken.id,
                decimals: sellingToken.decimals,
                symbol: sellingToken.symbol,
                name: sellingToken.name,
            }, sellingToken.amount.div(hardCodedAmount));
            if (realTokenPrice && tokenPriceLimit < realTokenPrice) {
                return this.swapTokens(swapTokensInput);
            }
        });
    }
    //Buy limit order function
    buyLimit(sellTokenSymbol, buyTokenSymbol, tokenPriceLimit) {
        return __awaiter(this, void 0, void 0, function* () {
            // gets the price of the wanted token
            let realTokenPrice = yield getPrice_1.getPrice2(this.subgraphEndpoint, buyTokenSymbol);
            //get holdings of vault
            const vaultHoldings = yield this.getHoldings();
            const symbols = [];
            for (const holding of vaultHoldings) {
                symbols.push(holding.symbol);
            }
            if (!symbols.includes(sellTokenSymbol)) {
                return;
            }
            // if you have no holdings, return
            if (vaultHoldings.length === 0) {
                console.log('Your fund has no assets.');
                return;
            }
            // define the buy token
            const buyingToken = this.tokens.assets.find((asset) => !asset.derivativeType && asset.symbol === buyTokenSymbol);
            //makes an amount array of numbers from getToken
            const holdingsAmounts = yield Promise.all(vaultHoldings.map((holding) => getTokenBalance_1.getTokenBalance(this.vaultAddress, holding.id, this.network)));
            // combine holding token data with amounts
            const holdingsWithAmounts = vaultHoldings.map((item, index) => {
                return Object.assign(Object.assign({}, item), { amount: holdingsAmounts[index] });
            });
            // find the token you will sell by searching for largest token holding
            const sellingToken = holdingsWithAmounts.find((asset) => !(asset === null || asset === void 0 ? void 0 : asset.derivativeType) && (asset === null || asset === void 0 ? void 0 : asset.symbol) === sellTokenSymbol);
            // the first input token will be bought, the second will be sold
            // this will create the input needed for our swap
            let bigNumberSample = ethers_1.BigNumber.from('50000000000000000');
            const swapTokensInput = yield this.getPrice({ id: buyingToken.id, decimals: buyingToken.decimals, symbol: buyingToken.symbol, name: buyingToken.name }, {
                id: sellingToken.id,
                decimals: sellingToken.decimals,
                symbol: sellingToken.symbol,
                name: sellingToken.name,
            }, sellingToken.amount);
            let cancelled = false;
            while (cancelled === false) {
                let realTokenPrice = yield getPrice_1.getPrice2(this.subgraphEndpoint, buyTokenSymbol);
                if (realTokenPrice && tokenPriceLimit < realTokenPrice) {
                    cancelled = true;
                    return this.swapTokens(swapTokensInput);
                }
            }
        });
    }
    //Sell limit order function
    sellLimit(sellTokenSymbol, buyTokenSymbol, tokenPriceLimit) {
        return __awaiter(this, void 0, void 0, function* () {
            // this is getting the price of the sellToken
            let realTokenPrice = yield getPrice_1.getPrice2(this.subgraphEndpoint, sellTokenSymbol);
            //get holdings of vault
            const vaultHoldings = yield this.getHoldings();
            const symbols = [];
            for (const holding of vaultHoldings) {
                symbols.push(holding.symbol);
            }
            if (!symbols.includes(sellTokenSymbol)) {
                return;
            }
            // if you have no holdings, return
            if (vaultHoldings.length === 0) {
                console.log('Your fund has no assets.');
                return;
            }
            // define the buy token
            const buyingToken = this.tokens.assets.find((asset) => !asset.derivativeType && asset.symbol === buyTokenSymbol);
            //makes an amount array of numbers from getToken
            const holdingsAmounts = yield Promise.all(vaultHoldings.map((holding) => getTokenBalance_1.getTokenBalance(this.vaultAddress, holding.id, this.network)));
            // combine holding token data with amounts
            const holdingsWithAmounts = vaultHoldings.map((item, index) => {
                return Object.assign(Object.assign({}, item), { amount: holdingsAmounts[index] });
            });
            // find the token you will sell by searching for largest token holding
            const sellingToken = holdingsWithAmounts.find((asset) => !(asset === null || asset === void 0 ? void 0 : asset.derivativeType) && (asset === null || asset === void 0 ? void 0 : asset.symbol) === sellTokenSymbol);
            // the first input token will be bought, the second will be sold
            // this will create the input needed for our swap
            const swapTokensInput = yield this.getPrice({ id: buyingToken.id, decimals: buyingToken.decimals, symbol: buyingToken.symbol, name: buyingToken.name }, {
                id: sellingToken.id,
                decimals: sellingToken.decimals,
                symbol: sellingToken.symbol,
                name: sellingToken.name,
            }, sellingToken.amount);
            let cancelled = false;
            while (cancelled === false) {
                let realTokenPrice = yield getPrice_1.getPrice2(this.subgraphEndpoint, buyTokenSymbol);
                if (realTokenPrice && realTokenPrice > tokenPriceLimit) {
                    cancelled = true;
                    return this.swapTokens(swapTokensInput);
                }
            }
        });
    }
    swapWithAmount(sellTokenSymbol, buyTokenSymbol, tokenAmount) {
        return __awaiter(this, void 0, void 0, function* () {
            // gets the price of the wanted token
            let realTokenPrice = yield getPrice_1.getPrice2(this.subgraphEndpoint, buyTokenSymbol);
            //get holdings of vault
            const vaultHoldings = yield this.getHoldings();
            // if you have no holdings, return
            if (vaultHoldings.length === 0) {
                console.log('Your fund has no assets.');
                return;
            }
            // define the buy token
            const buyingToken = this.tokens.assets.find((asset) => !asset.derivativeType && asset.symbol === buyTokenSymbol);
            console.log('Buying token \n ------------------------------');
            console.log(buyingToken);
            //makes an amount array of numbers from getToken
            const holdingsAmounts = yield Promise.all(vaultHoldings.map((holding) => getTokenBalance_1.getTokenBalance(this.vaultAddress, holding.id, this.network)));
            // combine holding token data with amounts
            const holdingsWithAmounts = vaultHoldings.map((item, index) => {
                return Object.assign(Object.assign({}, item), { amount: holdingsAmounts[index] });
            });
            // find the token you will sell by searching for largest token holding
            const sellingToken = holdingsWithAmounts.find((asset) => !(asset === null || asset === void 0 ? void 0 : asset.derivativeType) && (asset === null || asset === void 0 ? void 0 : asset.symbol) === sellTokenSymbol);
            console.log('Selling Token \n ------------------------------');
            console.log(sellingToken);
            // the first input token will be bought, the second will be sold
            // this will create the input needed for our swap
            const swapTokensInput = yield this.getPrice({ id: buyingToken.id, decimals: buyingToken.decimals, symbol: buyingToken.symbol, name: buyingToken.name }, {
                id: sellingToken.id,
                decimals: sellingToken.decimals,
                symbol: sellingToken.symbol,
                name: sellingToken.name,
            }, tokenAmount);
            console.log('Swap Tokens Input \n ------------------------------');
            console.log(swapTokensInput);
            return this.swapTokens(swapTokensInput);
        });
    }
}
exports.EnzymeBot = EnzymeBot;
