import { EnzymeBot } from './EnzymeBot';
import { CurveLiquidityAaveAdapter } from '@enzymefinance/protocol';
import { getGasPrice } from './utils/getGasPrice';
import { getRevertError } from './utils/getRevertError';
import { getTokenBalance } from './utils/getTokenBalance';
import { BigNumber, providers, Signer, utils, Wallet } from 'ethers';
import { SharesBoughtEvent_OrderBy } from './utils/subgraph/subgraph';
import { defaultFieldResolver } from 'graphql';
import { gql } from './utils/subgraph/sdk';
import { AssetBlacklistSetting_OrderBy } from './utils/subgraph/subgraph';

export const getDecimal = (bot: EnzymeBot) => {};

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

      console.log('This trade has been submitted to the blockchain. TRANSACTION HASH ==>', resolved.transactionHash);

      console.log(`Transaction successful. You spent ${resolved.gasUsed.toString()} in gas.`);
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
    console.log('Scheduling the next iteration...');

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
    rebalancedHoldings?: { symbol: string; percentage: number }[];
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
  switch (func2pass) {
    case 'liquidate':
      //only liquidate the tokens in here
      console.log('Hello');
      const tokensToLiquidate: string[] = args.liquidateTokens!;

      console.log('It got past declaring vaultHoldings');

      for (let i = 0; i < holdingsLength; i++) {
        await console.log(`BEFORE LIQUIDATE This is within the for each loop index of ${i} `);
        //check the token we are swapping is not zero and is a token that should be liquidated
        if (!vaultHoldings[i].amount.isZero() || !tokensToLiquidate.includes(vaultHoldings[i].symbol!)) {
          await run(currentBot, func2pass, { tokenSell: vaultHoldings[i], toBeSwappedInto: args.toBeSwappedInto }).then(
            (res) => console.log("That's all folks.")
          );
        } else {
          console.log('Amount was zero');
        }

        await console.log(`AFTER LIQUIDATE This is within the for each loop index of ${i} `);
      }
      //await run(await EnzymeBot.create('KOVAN'), func2pass); //.then((res) => console.log("That's all folks."));
      break;
    case 'buyLimit':
      await run(currentBot, func2pass, {
        tokenSell: args.tokenSell,
        tokenBuy: args.tokenBuy,
        priceLimit: args.priceLimit,
      });
      break;
    case 'sellLimit':
      await run(currentBot, func2pass, {
        tokenSell: args.tokenSell,
        tokenBuy: args.tokenBuy,
        priceLimit: args.priceLimit,
      });
      break;

    // case 'addHolding':
    //   await run(await EnzymeBot.create('KOVAN'), func2pass);
    //   break;
    case 'swapWithAmount':
      await run(currentBot, func2pass, {
        tokenSell: args.tokenSell,
        tokenBuy: args.tokenBuy,
        amount: args.amount,
      });
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

      const holdingsIsEqual = await currentBot.IfHoldingIsEqual(currentHoldingsWithAmounts, rebalanceHoldingsWithAmout);
      console.log('gets value of holdings' + holdingsIsEqual);
      if (!holdingsIsEqual) {
        console.log('The holding values are not equal!');
        return;
      }
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
              await run(currentBot, 'swapWithAmount', {
                tokenSell: holding.symbol,
                tokenBuy: 'WETH',
                amount: difference,
              });
              //currentBot.swapWithAmount(holding.symbol!, 'WETH', difference);
            }
          } else {
            console.log('Removed all holding: ' + holding.symbol);
            await run(currentBot, 'buyLimit', {
              tokenSell: holding.symbol!,
              tokenBuy: 'WETH',
              priceLimit: 0,
            });
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
            await run(currentBot, 'swapWithAmount', {
              tokenSell: 'WETH',
              tokenBuy: holding.symbol,
              amount: EthAmount,
            });
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
          await run(currentBot, 'swapWithAmount', {
            tokenSell: 'WETH',
            tokenBuy: holding.symbol,
            amount: EthAmount,
          });
        }
      }

      break;

    default:
      currentBot.getVaultValues();
  }
};

export const greetUser = (user: string) => {
  return `Hello, ${user}`;
};

export const goodbyeUser = (user: string) => {
  return `Goodbye, ${user}`;
};

export { EnzymeBot };
//main('rebalancePortfolio');

// npm install --production=false
// npm run codegen
// npm run dev
