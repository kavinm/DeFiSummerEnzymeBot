import { EnzymeBot } from './EnzymeBot';
import { CurveLiquidityAaveAdapter } from '@enzymefinance/protocol';
import { getGasPrice } from './utils/getGasPrice';
import { getRevertError } from './utils/getRevertError';
import { getTokenBalance } from './utils/getTokenBalance';
import { getTokens } from './utils/getToken';
import { BigNumber, providers, Signer, utils, Wallet } from 'ethers';
import { SharesBoughtEvent_OrderBy } from './utils/subgraph/subgraph';
import { defaultFieldResolver } from 'graphql';
import { gql } from './utils/subgraph/sdk';
import { AssetBlacklistSetting_OrderBy } from './utils/subgraph/subgraph';
import { getPrice2 } from './utils/getPrice';

export const getDecimal = (bot: EnzymeBot) => {};
export const getPrice = getPrice2;
export const getCurrentHoldings = async (bot: EnzymeBot) => {
  const vaultHoldings = await bot.getHoldings(); //.then(res => {console.log('This is the v holdings\n' )}
  console.log(await vaultHoldings);
  //makes an amount array of numbers from getToken
  const holdingsAmounts = await Promise.all(
    vaultHoldings.map((holding) => getTokenBalance(bot.vaultAddress, holding!.id, bot.network))
  );

  //combines the vault holdings (list of token objects) with token amounts
  const holdingsWithAmounts = vaultHoldings.map((item, index) => {
    return { ...item, amount: holdingsAmounts[index] };
  });

  return holdingsWithAmounts;
};

export const run = async (
  bot: EnzymeBot,
  funcName: string,
  args: { tokenSell?: any; tokenBuy?: any; amount?: any; toBeSwappedInto?: string; priceLimit?: number }
) => {
  const vaultHoldings = await bot.getHoldings();
  const lengthHoldings = vaultHoldings.length;

  try {
    // return the transaction object
    let tx;
    switch (funcName) {
      case 'liquidate':
        tx = await bot.liquidate(args.tokenSell, args.toBeSwappedInto!);
        break;
      case 'buyLimit':
        tx = await bot.buyLimit(args.tokenSell, args.tokenBuy, args.priceLimit!);
        break;
      case 'sellLimit':
        tx = await bot.sellLimit(args.tokenSell, args.tokenBuy, args.priceLimit!);
        break;
      // case 'addHolding':
      //   tx = await bot.addHolding(tokenSell, tokenBuy, 0);
      //   break;
      case 'swapWithAmount':
        tx = await bot.swapWithAmount(args.tokenSell, args.tokenBuy, args.amount);
        break;
    }

    //const tx = await bot.sellLimit("WBTC", "YFI", 5);

    // if for some reason the transaction is returned as undefined, return
    if (tx) {
      // verifies you can send the tx - throws an exception if it doesn't validate
      await tx.call();

      // get gas limit ()
      const gasLimit = await (await tx.estimate()).mul(10).div(9);

      // on mainnet, returns a gasPrice in gwei from EthGasStation that's most likely to get your transaction done within N minutes
      const gasPrice = bot.network === 'KOVAN' ? undefined : await getGasPrice(2);

      // if send is set to false it'll give you the tx object that contains the hash
      const resolved = await tx.gas(gasLimit, gasPrice).send();
      let successfulTransaction = '';

      successfulTransaction =
        successfulTransaction +
        'This trade has been submitted to the blockchain. TRANSACTION HASH ==>' +
        resolved.transactionHash;
      successfulTransaction =
        successfulTransaction + '\n' + `Transaction successful. You spent ${resolved.gasUsed.toString()} in gas.`;

      return successfulTransaction;
    } else {
      console.log('The bot has decided not to trade.');
    }
  } catch (error) {
    console.error('THE BOT FAILED :*(. Error below: ');

    if (error.error?.data) {
      console.log(getRevertError(error.error.data));
    }

    if (error.error?.message) {
      console.log(error.error.message);
    }

    console.log(error);
  } finally {
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
};

export const main = async (
  inputFunction: string,
  bot: EnzymeBot,
  args: {
    liquidateTokens?: string[];
    rebalancedHoldings?: { symbol: string; amount: number }[];
    tokenSell?: any;
    tokenBuy?: any;
    amount?: any;
    toBeSwappedInto?: string;
    priceLimit?: number;
  }
) => {
  const currentBot = bot;

  //inputFunction
  const func2pass = inputFunction;

  const vaultHoldings = await getCurrentHoldings(currentBot);
  const holdingsLength = vaultHoldings.length;
  let successfulMessage = '';
  switch (func2pass) {
    case 'liquidate':
      //only liquidate the tokens in here
      const tokensToLiquidate: string[] = args.liquidateTokens!;

      console.log('It got past declaring vaultHoldings');

      for (let i = 0; i < holdingsLength; i++) {
        await console.log(`BEFORE LIQUIDATE This is within the for each loop index of ${i} `);
        //check the token we are swapping is not zero and is a token that should be liquidated
        if (!vaultHoldings[i].amount.isZero() && tokensToLiquidate.includes(vaultHoldings[i].symbol!)) {
          successfulMessage =
            successfulMessage +
            (await run(currentBot, func2pass, { tokenSell: vaultHoldings[i], toBeSwappedInto: args.toBeSwappedInto }));
        } else {
          console.log('Amount was zero');
        }

        await console.log(`AFTER LIQUIDATE This is within the for each loop index of ${i} `);
      }
      return successfulMessage;
      //await run(await EnzymeBot.create('KOVAN'), func2pass); //.then((res) => console.log("That's all folks."));
      break;
    case 'buyLimit':
      successfulMessage =
        successfulMessage +
        (await run(currentBot, func2pass, {
          tokenSell: args.tokenSell,
          tokenBuy: args.tokenBuy,
          priceLimit: args.priceLimit,
        }));
      return successfulMessage;
      break;
    case 'sellLimit':
      successfulMessage =
        successfulMessage +
        (await run(currentBot, func2pass, {
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
        (await run(currentBot, func2pass, {
          tokenSell: args.tokenSell,
          tokenBuy: args.tokenBuy,
          amount: args.amount,
        }));
      return successfulMessage;
      break;
    case 'getHoldings':
      await currentBot.getHoldingsWithNumberAmounts;
      break;

    case 'rebalancePortfolio':
      const rebalanceHoldingsWithAmout = await currentBot.CreatesRebalanceHoldings(args.rebalancedHoldings);
      //const vaultHoldings = await getCurrentHoldings(currentBot);
      //console.log('got rebalanceHoldings' + rebalanceHoldingsWithAmout);
      //makes an amount array of numbers from getToken
      const holdingsAmounts = await Promise.all(
        vaultHoldings.map((holding) => getTokenBalance(currentBot.vaultAddress, holding.id!, currentBot.network))
      );

      // combine holding token data with amounts
      const currentHoldingsWithAmounts = vaultHoldings.map((item, index) => {
        return { ...item, amount: holdingsAmounts[index] };
      });

      //first check if rebalanced Holdings are equal or within 5%
      const holdingsIsEqual = await currentBot.IfHoldingIsEqual(currentHoldingsWithAmounts, rebalanceHoldingsWithAmout);
      console.log('gets value of holdings' + holdingsIsEqual);
      if (!holdingsIsEqual) {
        console.log('The holding values are not equal!');
        return;
      }

      //logic for holdings order plan is contained in logic.txt
      const symbolsCurrent: string[] = [];
      const symbolsRebalanced: string[] = [];

      for (let holding of currentHoldingsWithAmounts) {
        symbolsCurrent.push(holding.symbol!);
      }

      for (let holding of rebalanceHoldingsWithAmout) {
        symbolsRebalanced.push(holding.symbol!);
      }
      let i = 0;
      console.log('before loop');
      for (let holding of currentHoldingsWithAmounts) {
        //Skips over holding that are zero value
        if (holding.amount._hex != '0x00') {
          //console.log(holding.symbol);
          //console.log(symbolsRebalanced);
          if (symbolsRebalanced.includes(holding.symbol!)) {
            //console.log(holding);
            const rebalancedIndex = symbolsRebalanced.indexOf(holding.symbol!);
            console.log('REBALANCED HOLDING WITH AMOUNT ---------- \n');
            console.log(rebalancedIndex);
            //console.log(rebalanceHoldingsWithAmout[rebalancedIndex]);
            if (holding.amount.gt(rebalanceHoldingsWithAmout[rebalancedIndex].amount)) {
              let difference = holding.amount.sub(rebalanceHoldingsWithAmout[rebalancedIndex].amount);
              console.log('The difference for current Holding' + difference);
              console.log('Swap With Amount');
              successfulMessage =
                successfulMessage +
                (await run(currentBot, 'swapWithAmount', {
                  tokenSell: holding.symbol,
                  tokenBuy: 'WETH',
                  amount: difference,
                }));
              //currentBot.swapWithAmount(holding.symbol!, 'WETH', difference);
            }
          } else {
            if (holding.symbol != 'WETH') {
              console.log('Removed all holding: ' + holding.symbol);
              successfulMessage =
                successfulMessage +
                (await run(currentBot, 'buyLimit', {
                  tokenSell: holding.symbol!,
                  tokenBuy: 'WETH',
                  priceLimit: 0,
                }));
            }
          }
        }
      }
      const result = await gql(currentBot.subgraphEndpoint).assets();
      for (let holding of rebalanceHoldingsWithAmout) {
        if (symbolsCurrent.includes(holding.symbol!)) {
          const currentindex = symbolsCurrent.indexOf(holding.symbol!);
          let holdingPrice = Number(result.assets.find((asset) => asset.symbol === holding.symbol)?.price?.price);
          if (holding.amount.gt(currentHoldingsWithAmounts[currentindex].amount)) {
            let difference = holding.amount.sub(currentHoldingsWithAmounts[currentindex].amount);
            const DecimalDifference = parseInt(difference._hex, 16);
            const amountInDecimal = DecimalDifference / 10 ** holding.decimals!;
            console.log('Amount in decimal: ' + amountInDecimal);
            console.log('holding price: ' + holdingPrice);
            console.log('Holdig symbol: ' + holding.symbol);
            const vartosix = BigNumber.from(10 ** 6);
            let EthAmount = BigNumber.from(amountInDecimal * holdingPrice).mul(vartosix);
            EthAmount = EthAmount.mul(vartosix);
            EthAmount = EthAmount.mul(vartosix);
            console.log('EthAmount: ' + EthAmount);
            successfulMessage =
              successfulMessage +
              (await run(currentBot, 'swapWithAmount', {
                tokenSell: 'WETH',
                tokenBuy: holding.symbol,
                amount: EthAmount,
              }));
          }
        } else {
          let holdingPrice = Number(result.assets.find((asset) => asset.symbol === holding.symbol)?.price?.price);
          let difference = holding.amount;
          console.log(difference);
          console.log('Swap With Amount');
          const DecimalDifference = parseInt(difference._hex, 16);
          // converts to
          const amountInDecimal = DecimalDifference / 10 ** holding.decimals!;
          const totalAmountHex = '0x' + (amountInDecimal * holdingPrice * 10 ** 18).toString(16);
          let EthAmount = BigNumber.from(totalAmountHex);
          console.log('EthAmount: ' + EthAmount);
          successfulMessage =
            successfulMessage +
            (await run(currentBot, 'swapWithAmount', {
              tokenSell: 'WETH',
              tokenBuy: holding.symbol,
              amount: EthAmount,
            }));
        }
      }
      return successfulMessage;

      break;

    case 'rebalancePortfolioUSDCPlan':
      const rebalancedHoldingsWithAmountUSDC = await currentBot.CreatesRebalanceHoldings(args.rebalancedHoldings);
      //const vaultHoldings = await getCurrentHoldings(currentBot);
      //console.log('got rebalanceHoldings' + rebalanceHoldingsWithAmout);
      //makes an amount array of numbers from getToken
      const holdingsAmountsUSDC = await Promise.all(
        vaultHoldings.map((holding) => getTokenBalance(currentBot.vaultAddress, holding.id!, currentBot.network))
      );

      // combine holding token data with amounts
      const currentHoldingsWithAmountsUSDC = vaultHoldings.map((item, index) => {
        return { ...item, amount: holdingsAmountsUSDC[index] };
      });

      //first check if rebalanced Holdings are equal or within 5%
      const holdingsAreEqualUSDC = await currentBot.IfHoldingIsEqual(
        currentHoldingsWithAmountsUSDC,
        rebalancedHoldingsWithAmountUSDC
      );
      console.log('gets value of holdings' + holdingsAreEqualUSDC);
      if (!holdingsAreEqualUSDC) {
        console.log('The holding values are not equal!');
        return;
      }

      //logic for holdings order plan is contained in logic.txt
      const symbolsCurrentUSDC: string[] = [];
      const symbolsRebalancedUSDC: string[] = [];

      for (let holding of currentHoldingsWithAmountsUSDC) {
        symbolsCurrentUSDC.push(holding.symbol!);
      }

      for (let holding of rebalancedHoldingsWithAmountUSDC) {
        symbolsRebalancedUSDC.push(holding.symbol!);
      }
      let iUSDC = 0;
      console.log('before loop');
      for (let holding of currentHoldingsWithAmountsUSDC) {
        //Skips over holding that are zero value
        if (holding.amount._hex != '0x00') {
          //console.log(holding.symbol);
          //console.log(symbolsRebalanced);
          if (symbolsRebalancedUSDC.includes(holding.symbol!)) {
            //console.log(holding);
            const rebalancedIndex = symbolsRebalancedUSDC.indexOf(holding.symbol!);
            console.log('REBALANCED HOLDING WITH AMOUNT ---------- \n');
            console.log(rebalancedIndex);
            //console.log(rebalanceHoldingsWithAmout[rebalancedIndex]);
            if (holding.amount.gt(rebalancedHoldingsWithAmountUSDC[rebalancedIndex].amount)) {
              let difference = holding.amount.sub(rebalancedHoldingsWithAmountUSDC[rebalancedIndex].amount);
              console.log('The difference for current Holding' + difference);
              console.log('Swap With Amount');
              successfulMessage =
                successfulMessage +
                (await run(currentBot, 'swapWithAmount', {
                  tokenSell: holding.symbol,
                  tokenBuy: 'USDC',
                  amount: difference,
                }));
              //currentBot.swapWithAmount(holding.symbol!, 'WETH', difference);
            }
          } else {
            if (holding.symbol != 'USDC') {
              console.log('Removed all holding: ' + holding.symbol);
              successfulMessage =
                successfulMessage +
                (await run(currentBot, 'buyLimit', {
                  tokenSell: holding.symbol!,
                  tokenBuy: 'USDC',
                  priceLimit: 0,
                }));
            }
          }
        }
      }
      //const resultUSDC = await gql(currentBot.subgraphEndpoint).assets();
      for (let holding of rebalancedHoldingsWithAmountUSDC) {
        if (symbolsCurrentUSDC.includes(holding.symbol!)) {
          const currentindex = symbolsCurrentUSDC.indexOf(holding.symbol!);
          //get holding price in ETH
          let holdingPrice = await getPrice2(bot.subgraphEndpoint, holding.symbol);

          if (holding.amount.gt(currentHoldingsWithAmountsUSDC[currentindex].amount)) {
            let difference = holding.amount.sub(currentHoldingsWithAmountsUSDC[currentindex].amount);
            //get difference between before and after
            const DecimalDifference = parseInt(difference._hex, 16);
            const amountInDecimal = DecimalDifference / 10 ** holding.decimals!;
            console.log('Amount in decimal: ' + amountInDecimal);
            console.log('holding price: ' + holdingPrice);
            console.log('Holdig symbol: ' + holding.symbol);
            const vartosix = BigNumber.from(10 ** 6);
            let USDCAmount = BigNumber.from(amountInDecimal * holdingPrice!).mul(vartosix);
            USDCAmount = USDCAmount.mul(vartosix);
            USDCAmount = USDCAmount.mul(vartosix);
            console.log('USDCAmount: ' + USDCAmount);
            successfulMessage =
              successfulMessage +
              (await run(currentBot, 'swapWithAmount', {
                tokenSell: 'USDC',
                tokenBuy: holding.symbol,
                amount: USDCAmount,
              }));
          }
        } else {
          let holdingPrice = await getPrice2(bot.subgraphEndpoint, holding.symbol);
          let difference = holding.amount;

          const DecimalDifference = parseInt(difference._hex, 16);

          const amountInDecimal = DecimalDifference / 10 ** holding.decimals!;
          const totalAmountHex = '0x' + (amountInDecimal * holdingPrice! * 10 ** 18).toString(16);
          let USDCAmount = BigNumber.from(totalAmountHex);
          console.log('USDC: ' + USDCAmount);
          successfulMessage =
            successfulMessage +
            (await run(currentBot, 'swapWithAmount', {
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
};

//is hard coded to only work with KOVAN right now
export const getERC20Tokens = async (network: 'KOVAN' | 'MAINNET' = 'KOVAN') => {
  let tokenRequestResult;
  if (network === 'KOVAN') {
    tokenRequestResult = await getTokens('https://api.thegraph.com/subgraphs/name/enzymefinance/enzyme-kovan');
  } else {
    tokenRequestResult = await getTokens('https://api.thegraph.com/subgraphs/name/enzymefinance/enzyme');
  }

  const TokenList = tokenRequestResult.assets.filter((asset) => !asset.derivativeType);

  console.log(TokenList.length);
  return TokenList;
};

export { EnzymeBot };

const mainRunner = async () => {
  const currentBot = await EnzymeBot.staticCreateKovan();
  //main('rebalancePortfolio', currentBot, {rebalancedHoldings: [{symbol: 'USDC', amount:510000 }]});
  console.log(
    await main('rebalancePortfolioUSDCPlan', currentBot, { rebalancedHoldings: [{ symbol: 'USDC', amount: 2359000 }] })
  );
  //console.log(await main('swapWithAmount', currentBot, { tokenSell: 'WBTC', tokenBuy: 'UNI', amount: 10000000 }));
  //console.log(await currentBot.getVaultValues());
  //getERC20Tokens('MAINNET');
};

//mainRunner();

// npm install --production=false
// npm run codegen
// npm run dev
