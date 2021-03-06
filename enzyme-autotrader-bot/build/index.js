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
exports.EnzymeBot = exports.getERC20Tokens = exports.main = exports.run = exports.getCurrentHoldings = exports.getPrice = exports.getDecimal = void 0;
const EnzymeBot_1 = require("./EnzymeBot");
Object.defineProperty(exports, "EnzymeBot", { enumerable: true, get: function () { return EnzymeBot_1.EnzymeBot; } });
const getGasPrice_1 = require("./utils/getGasPrice");
const getRevertError_1 = require("./utils/getRevertError");
const getTokenBalance_1 = require("./utils/getTokenBalance");
const getToken_1 = require("./utils/getToken");
const ethers_1 = require("ethers");
const sdk_1 = require("./utils/subgraph/sdk");
const getPrice_1 = require("./utils/getPrice");
const getDecimal = (bot) => { };
exports.getDecimal = getDecimal;
exports.getPrice = getPrice_1.getPrice2;
const getCurrentHoldings = (bot) => __awaiter(void 0, void 0, void 0, function* () {
    const vaultHoldings = yield bot.getHoldings(); //.then(res => {console.log('This is the v holdings\n' )}
    console.log(yield vaultHoldings);
    //makes an amount array of numbers from getToken
    const holdingsAmounts = yield Promise.all(vaultHoldings.map((holding) => getTokenBalance_1.getTokenBalance(bot.vaultAddress, holding.id, bot.network)));
    //combines the vault holdings (list of token objects) with token amounts
    const holdingsWithAmounts = vaultHoldings.map((item, index) => {
        return Object.assign(Object.assign({}, item), { amount: holdingsAmounts[index] });
    });
    return holdingsWithAmounts;
});
exports.getCurrentHoldings = getCurrentHoldings;
const run = (bot, funcName, args) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const vaultHoldings = yield bot.getHoldings();
    const lengthHoldings = vaultHoldings.length;
    console.log('____________________________');
    console.log('This should be outputted if the npm package has been updated');
    console.log('____________________________');
    try {
        // return the transaction object
        let tx;
        switch (funcName) {
            case 'liquidate':
                tx = yield bot.liquidate(args.tokenSell, args.toBeSwappedInto);
                break;
            case 'buyLimit':
                tx = yield bot.buyLimit(args.tokenSell, args.tokenBuy, args.priceLimit);
                break;
            case 'sellLimit':
                tx = yield bot.sellLimit(args.tokenSell, args.tokenBuy, args.priceLimit);
                break;
            // case 'addHolding':
            //   tx = await bot.addHolding(tokenSell, tokenBuy, 0);
            //   break;
            case 'swapWithAmount':
                tx = yield bot.swapWithAmount(args.tokenSell, args.tokenBuy, args.amount);
                break;
        }
        //const tx = await bot.sellLimit("WBTC", "YFI", 5);
        // if for some reason the transaction is returned as undefined, return
        if (tx) {
            // verifies you can send the tx - throws an exception if it doesn't validate
            yield tx.call();
            // get gas limit ()
            const gasLimit = yield (yield tx.estimate()).mul(10).div(9);
            // on mainnet, returns a gasPrice in gwei from EthGasStation that's most likely to get your transaction done within N minutes
            const gasPrice = bot.network === 'KOVAN' ? undefined : yield getGasPrice_1.getGasPrice(2);
            // if send is set to false it'll give you the tx object that contains the hash
            const resolved = yield tx.gas(gasLimit, gasPrice).send();
            let successfulTransaction = '';
            successfulTransaction =
                successfulTransaction +
                    'This trade has been submitted to the blockchain. TRANSACTION HASH ==>' +
                    resolved.transactionHash;
            successfulTransaction =
                successfulTransaction + '\n' + `Transaction successful. You spent ${resolved.gasUsed.toString()} in gas.`;
            return successfulTransaction;
        }
        else {
            console.log('The bot has decided not to trade.');
        }
    }
    catch (error) {
        console.error('THE BOT FAILED :*(. Error below: ');
        if ((_a = error.error) === null || _a === void 0 ? void 0 : _a.data) {
            console.log(getRevertError_1.getRevertError(error.error.data));
        }
        if ((_b = error.error) === null || _b === void 0 ? void 0 : _b.message) {
            console.log(error.error.message);
        }
        console.log(error);
    }
    finally {
        // commented out to prevent loop  in exchanging tokens
        // setTimeout(() => {
        //   while (i < (vaultHoldings?.length || 0)) {
        //     i++;
        //     run(bot);
        //     console.log(`Liquidating the ${i}th Token`);
        //   }
        // });
    }
    return Promise.resolve(true);
});
exports.run = run;
const main = (inputFunction, bot, args) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e, _f;
    const currentBot = bot;
    //inputFunction
    const func2pass = inputFunction;
    const vaultHoldings = yield exports.getCurrentHoldings(currentBot);
    const holdingsLength = vaultHoldings.length;
    let successfulMessage = '';
    switch (func2pass) {
        case 'liquidate':
            //only liquidate the tokens in here
            const tokensToLiquidate = args.liquidateTokens;
            console.log('It got past declaring vaultHoldings');
            for (let i = 0; i < holdingsLength; i++) {
                yield console.log(`BEFORE LIQUIDATE This is within the for each loop index of ${i} `);
                //check the token we are swapping is not zero and is a token that should be liquidated
                if (!vaultHoldings[i].amount.isZero() && tokensToLiquidate.includes(vaultHoldings[i].symbol)) {
                    successfulMessage =
                        successfulMessage +
                            (yield exports.run(currentBot, func2pass, { tokenSell: vaultHoldings[i], toBeSwappedInto: args.toBeSwappedInto }));
                }
                else {
                    console.log('Amount was zero');
                }
                yield console.log(`AFTER LIQUIDATE This is within the for each loop index of ${i} `);
            }
            return successfulMessage;
            //await run(await EnzymeBot.create('KOVAN'), func2pass); //.then((res) => console.log("That's all folks."));
            break;
        case 'buyLimit':
            successfulMessage =
                successfulMessage +
                    (yield exports.run(currentBot, func2pass, {
                        tokenSell: args.tokenSell,
                        tokenBuy: args.tokenBuy,
                        priceLimit: args.priceLimit,
                    }));
            return successfulMessage;
            break;
        case 'sellLimit':
            successfulMessage =
                successfulMessage +
                    (yield exports.run(currentBot, func2pass, {
                        tokenSell: args.tokenSell,
                        tokenBuy: args.tokenBuy,
                        priceLimit: args.priceLimit,
                    }));
            return successfulMessage;
            break;
        // case 'addHolding':
        //   await run(await EnzymeBot.create('KOVAN'), func2pass);
        //   break;
        case 'swapWithAmount':
            successfulMessage =
                successfulMessage +
                    (yield exports.run(currentBot, func2pass, {
                        tokenSell: args.tokenSell,
                        tokenBuy: args.tokenBuy,
                        amount: args.amount,
                    }));
            return successfulMessage;
            break;
        case 'getHoldings':
            yield currentBot.getHoldingsWithNumberAmounts;
            break;
        case 'rebalancePortfolio':
            const rebalanceHoldingsWithAmout = yield currentBot.CreatesRebalanceHoldings(args.rebalancedHoldings);
            //const vaultHoldings = await getCurrentHoldings(currentBot);
            //console.log('got rebalanceHoldings' + rebalanceHoldingsWithAmout);
            //makes an amount array of numbers from getToken
            const holdingsAmounts = yield Promise.all(vaultHoldings.map((holding) => getTokenBalance_1.getTokenBalance(currentBot.vaultAddress, holding.id, currentBot.network)));
            // combine holding token data with amounts
            const currentHoldingsWithAmounts = vaultHoldings.map((item, index) => {
                return Object.assign(Object.assign({}, item), { amount: holdingsAmounts[index] });
            });
            //first check if rebalanced Holdings are equal or within 5%
            const holdingsIsEqual = yield currentBot.IfHoldingIsEqual(currentHoldingsWithAmounts, rebalanceHoldingsWithAmout);
            console.log('gets value of holdings' + holdingsIsEqual);
            if (!holdingsIsEqual) {
                console.log('The holding values are not equal!');
                return;
            }
            //logic for holdings order plan is contained in logic.txt
            const symbolsCurrent = [];
            const symbolsRebalanced = [];
            for (let holding of currentHoldingsWithAmounts) {
                symbolsCurrent.push(holding.symbol);
            }
            for (let holding of rebalanceHoldingsWithAmout) {
                symbolsRebalanced.push(holding.symbol);
            }
            let i = 0;
            console.log('before loop');
            for (let holding of currentHoldingsWithAmounts) {
                //Skips over holding that are zero value
                if (holding.amount._hex != '0x00') {
                    //console.log(holding.symbol);
                    //console.log(symbolsRebalanced);
                    if (symbolsRebalanced.includes(holding.symbol)) {
                        //console.log(holding);
                        const rebalancedIndex = symbolsRebalanced.indexOf(holding.symbol);
                        console.log('REBALANCED HOLDING WITH AMOUNT ---------- \n');
                        console.log(rebalancedIndex);
                        //console.log(rebalanceHoldingsWithAmout[rebalancedIndex]);
                        if (holding.amount.gt(rebalanceHoldingsWithAmout[rebalancedIndex].amount)) {
                            let difference = holding.amount.sub(rebalanceHoldingsWithAmout[rebalancedIndex].amount);
                            console.log('The difference for current Holding' + difference);
                            console.log('Swap With Amount');
                            successfulMessage =
                                successfulMessage +
                                    (yield exports.run(currentBot, 'swapWithAmount', {
                                        tokenSell: holding.symbol,
                                        tokenBuy: 'WETH',
                                        amount: difference,
                                    }));
                            //currentBot.swapWithAmount(holding.symbol!, 'WETH', difference);
                        }
                    }
                    else {
                        if (holding.symbol != 'WETH') {
                            console.log('Removed all holding: ' + holding.symbol);
                            successfulMessage =
                                successfulMessage +
                                    (yield exports.run(currentBot, 'buyLimit', {
                                        tokenSell: holding.symbol,
                                        tokenBuy: 'WETH',
                                        priceLimit: 0,
                                    }));
                        }
                    }
                }
            }
            const result = yield sdk_1.gql(currentBot.subgraphEndpoint).assets();
            for (let holding of rebalanceHoldingsWithAmout) {
                if (symbolsCurrent.includes(holding.symbol)) {
                    const currentindex = symbolsCurrent.indexOf(holding.symbol);
                    let holdingPrice = Number((_d = (_c = result.assets.find((asset) => asset.symbol === holding.symbol)) === null || _c === void 0 ? void 0 : _c.price) === null || _d === void 0 ? void 0 : _d.price);
                    if (holding.amount.gt(currentHoldingsWithAmounts[currentindex].amount)) {
                        let difference = holding.amount.sub(currentHoldingsWithAmounts[currentindex].amount);
                        const DecimalDifference = parseInt(difference._hex, 16);
                        const amountInDecimal = DecimalDifference / Math.pow(10, holding.decimals);
                        console.log('Amount in decimal: ' + amountInDecimal);
                        console.log('holding price: ' + holdingPrice);
                        console.log('Holdig symbol: ' + holding.symbol);
                        const vartosix = ethers_1.BigNumber.from(Math.pow(10, 6));
                        let EthAmount = ethers_1.BigNumber.from(amountInDecimal * holdingPrice).mul(vartosix);
                        EthAmount = EthAmount.mul(vartosix);
                        EthAmount = EthAmount.mul(vartosix);
                        console.log('EthAmount: ' + EthAmount);
                        successfulMessage =
                            successfulMessage +
                                (yield exports.run(currentBot, 'swapWithAmount', {
                                    tokenSell: 'WETH',
                                    tokenBuy: holding.symbol,
                                    amount: EthAmount,
                                }));
                    }
                }
                else {
                    let holdingPrice = Number((_f = (_e = result.assets.find((asset) => asset.symbol === holding.symbol)) === null || _e === void 0 ? void 0 : _e.price) === null || _f === void 0 ? void 0 : _f.price);
                    let difference = holding.amount;
                    console.log(difference);
                    console.log('Swap With Amount');
                    const DecimalDifference = parseInt(difference._hex, 16);
                    // converts to
                    const amountInDecimal = DecimalDifference / Math.pow(10, holding.decimals);
                    const totalAmountHex = '0x' + (amountInDecimal * holdingPrice * Math.pow(10, 18)).toString(16);
                    let EthAmount = ethers_1.BigNumber.from(totalAmountHex);
                    console.log('EthAmount: ' + EthAmount);
                    successfulMessage =
                        successfulMessage +
                            (yield exports.run(currentBot, 'swapWithAmount', {
                                tokenSell: 'WETH',
                                tokenBuy: holding.symbol,
                                amount: EthAmount,
                            }));
                }
            }
            return successfulMessage;
            break;
        case 'rebalancePortfolioUSDCPlan':
            const rebalancedHoldingsWithAmountUSDC = yield currentBot.CreatesRebalanceHoldings(args.rebalancedHoldings);
            //const vaultHoldings = await getCurrentHoldings(currentBot);
            //console.log('got rebalanceHoldings' + rebalanceHoldingsWithAmout);
            //makes an amount array of numbers from getToken
            const holdingsAmountsUSDC = yield Promise.all(vaultHoldings.map((holding) => getTokenBalance_1.getTokenBalance(currentBot.vaultAddress, holding.id, currentBot.network)));
            // combine holding token data with amounts
            const currentHoldingsWithAmountsUSDC = vaultHoldings.map((item, index) => {
                return Object.assign(Object.assign({}, item), { amount: holdingsAmountsUSDC[index] });
            });
            //first check if rebalanced Holdings are equal or within 5%
            const holdingsAreEqualUSDC = yield currentBot.IfHoldingIsEqual(currentHoldingsWithAmountsUSDC, rebalancedHoldingsWithAmountUSDC);
            console.log('gets value of holdings' + holdingsAreEqualUSDC);
            if (!holdingsAreEqualUSDC) {
                console.log('The holding values are not equal!');
                return;
            }
            //logic for holdings order plan is contained in logic.txt
            const symbolsCurrentUSDC = [];
            const symbolsRebalancedUSDC = [];
            for (let holding of currentHoldingsWithAmountsUSDC) {
                symbolsCurrentUSDC.push(holding.symbol);
            }
            for (let holding of rebalancedHoldingsWithAmountUSDC) {
                symbolsRebalancedUSDC.push(holding.symbol);
            }
            let iUSDC = 0;
            console.log('before loop');
            for (let holding of currentHoldingsWithAmountsUSDC) {
                //Skips over holding that are zero value
                if (holding.amount._hex != '0x00') {
                    //console.log(holding.symbol);
                    //console.log(symbolsRebalanced);
                    if (symbolsRebalancedUSDC.includes(holding.symbol)) {
                        //console.log(holding);
                        const rebalancedIndex = symbolsRebalancedUSDC.indexOf(holding.symbol);
                        console.log('REBALANCED HOLDING WITH AMOUNT ---------- \n');
                        console.log(rebalancedIndex);
                        //console.log(rebalanceHoldingsWithAmout[rebalancedIndex]);
                        if (holding.amount.gt(rebalancedHoldingsWithAmountUSDC[rebalancedIndex].amount)) {
                            let difference = holding.amount.sub(rebalancedHoldingsWithAmountUSDC[rebalancedIndex].amount);
                            console.log('The difference for current Holding' + difference);
                            console.log('Swap With Amount');
                            successfulMessage =
                                successfulMessage +
                                    (yield exports.run(currentBot, 'swapWithAmount', {
                                        tokenSell: holding.symbol,
                                        tokenBuy: 'USDC',
                                        amount: difference,
                                    }));
                            //currentBot.swapWithAmount(holding.symbol!, 'WETH', difference);
                        }
                    }
                    else {
                        if (holding.symbol != 'USDC') {
                            console.log('Removed all holding: ' + holding.symbol);
                            successfulMessage =
                                successfulMessage +
                                    (yield exports.run(currentBot, 'buyLimit', {
                                        tokenSell: holding.symbol,
                                        tokenBuy: 'USDC',
                                        priceLimit: 0,
                                    }));
                        }
                    }
                }
            }
            //const resultUSDC = await gql(currentBot.subgraphEndpoint).assets();
            for (let holding of rebalancedHoldingsWithAmountUSDC) {
                if (symbolsCurrentUSDC.includes(holding.symbol)) {
                    const currentindex = symbolsCurrentUSDC.indexOf(holding.symbol);
                    //get holding price in ETH
                    let holdingPrice = yield getPrice_1.getPrice2(bot.subgraphEndpoint, holding.symbol);
                    if (holding.amount.gt(currentHoldingsWithAmountsUSDC[currentindex].amount)) {
                        let difference = holding.amount.sub(currentHoldingsWithAmountsUSDC[currentindex].amount);
                        //get difference between before and after
                        const DecimalDifference = parseInt(difference._hex, 16);
                        const amountInDecimal = DecimalDifference / Math.pow(10, holding.decimals);
                        console.log('Amount in decimal: ' + amountInDecimal);
                        console.log('holding price: ' + holdingPrice);
                        console.log('Holdig symbol: ' + holding.symbol);
                        const vartosix = ethers_1.BigNumber.from(Math.pow(10, 6));
                        let USDCAmount = ethers_1.BigNumber.from(amountInDecimal * holdingPrice).mul(vartosix);
                        USDCAmount = USDCAmount.mul(vartosix);
                        USDCAmount = USDCAmount.mul(vartosix);
                        console.log('USDCAmount: ' + USDCAmount);
                        successfulMessage =
                            successfulMessage +
                                (yield exports.run(currentBot, 'swapWithAmount', {
                                    tokenSell: 'USDC',
                                    tokenBuy: holding.symbol,
                                    amount: USDCAmount,
                                }));
                    }
                }
                else {
                    let holdingPrice = yield getPrice_1.getPrice2(bot.subgraphEndpoint, holding.symbol);
                    let difference = holding.amount;
                    const DecimalDifference = parseInt(difference._hex, 16);
                    const amountInDecimal = DecimalDifference / Math.pow(10, holding.decimals);
                    const totalAmountHex = '0x' + (amountInDecimal * holdingPrice * Math.pow(10, 18)).toString(16);
                    let USDCAmount = ethers_1.BigNumber.from(totalAmountHex);
                    console.log('USDC: ' + USDCAmount);
                    successfulMessage =
                        successfulMessage +
                            (yield exports.run(currentBot, 'swapWithAmount', {
                                tokenSell: 'USDC',
                                tokenBuy: holding.symbol,
                                amount: USDCAmount,
                            }));
                }
            }
            return successfulMessage;
            break;
        default:
            currentBot.getVaultValues();
    }
});
exports.main = main;
//is hard coded to only work with KOVAN right now
const getERC20Tokens = (network = 'KOVAN') => __awaiter(void 0, void 0, void 0, function* () {
    let tokenRequestResult;
    if (network === 'KOVAN') {
        tokenRequestResult = yield getToken_1.getTokens('https://api.thegraph.com/subgraphs/name/enzymefinance/enzyme-kovan');
    }
    else {
        tokenRequestResult = yield getToken_1.getTokens('https://api.thegraph.com/subgraphs/name/enzymefinance/enzyme');
    }
    const TokenList = tokenRequestResult.assets.filter((asset) => !asset.derivativeType);
    console.log(TokenList.length);
    return TokenList;
});
exports.getERC20Tokens = getERC20Tokens;
const mainRunner = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentBot = yield EnzymeBot_1.EnzymeBot.staticCreateKovan();
    //main('rebalancePortfolio', currentBot, {rebalancedHoldings: [{symbol: 'USDC', amount:510000 }]});
    //await main('rebalancePortfolio', currentBot, { rebalancedHoldings: [{ symbol: 'USDC', amount: 2359000 }] });
    exports.main('swapWithAmount', currentBot, { tokenSell: 'UNI', tokenBuy: 'MKR', amount: '1000000000000000000000' });
    //console.log(await currentBot.getVaultValues());
    //getERC20Tokens('MAINNET');
});
mainRunner();
// npm install --production=false
// npm run codegen
// npm run dev
