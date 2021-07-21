import { CurveLiquidityAaveAdapter } from '@enzymefinance/protocol';
import { EnzymeBot } from './EnzymeBot';
import { getGasPrice } from './utils/getGasPrice';
import { getRevertError } from './utils/getRevertError';
import { getTokenBalance } from './utils/getTokenBalance';
import { BigNumber, providers, utils, Wallet } from 'ethers';
import { SharesBoughtEvent_OrderBy } from './utils/subgraph/subgraph';
import { defaultFieldResolver } from 'graphql';

//let i = 0;

async function getDecimal(bot: EnzymeBot) {}

async function getCurrentHoldings(bot: EnzymeBot) {
  const vaultHoldings = await bot.getHoldings();

  //makes an amount array of numbers from getToken
  const holdingsAmounts = await Promise.all(
    vaultHoldings.map((holding) => getTokenBalance(bot.vaultAddress, holding!.id, bot.network))
  );

  //combines the vault holdings (list of token objects) with token amounts
  const holdingsWithAmounts = vaultHoldings.map((item, index) => {
    return { ...item, amount: holdingsAmounts[index] };
  });

  //console.log(holdingsWithAmounts);
  //console.log('Above is the current vault holdings and the bottom is length holdings');
  //console.log(lengthHoldings);

  return holdingsWithAmounts;
  // console.log(holdingsWithAmounts);
}

async function run(bot: EnzymeBot, funcName: string, tokenSell?: any, tokenBuy?: any, amount?: any) {
  const vaultHoldings = await bot.getHoldings();
  const lengthHoldings = vaultHoldings.length;
  //console.log(vaultHoldings);
  //console.log('Above is the current vault holdings and the bottom is length holdings');
  //console.log(lengthHoldings);

  //const lengthHoldings = vaultHoldings?.length;

  try {
    // return the transaction object
    let tx;
    switch (funcName) {
      case 'liquidate':
        tx = await bot.liquidate(tokenSell);
        break;
      case 'buyLimit':
        tx = await bot.buyLimit(tokenSell, tokenBuy, 0);
        break;
      case 'sellLimit':
        tx = await bot.sellLimit(tokenSell, tokenBuy, 0);
        break;
      case 'addHolding':
        tx = await bot.addHolding();
        break;
      case 'swapWithAmount':
        //let bigNumberSample = BigNumber.from("83700000000000000")
        //console.log("big number sample \n ------------------------------")
        //console.log(bigNumberSample)
        tx = await bot.swapWithAmount(tokenSell, tokenBuy, amount);
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
}

(async function main() {
  const currentBot = await EnzymeBot.create('KOVAN');

  // //const ennzymefunction = getVaultValues;
  // const rebalanceHoldingsWithAmout = await currentBot.CreatesRebalanceHoldings();
  // const vaultHoldings = await getCurrentHoldings(currentBot);

  // //makes an amount array of numbers from getToken
  // const holdingsAmounts = await Promise.all(
  //   vaultHoldings.map((holding) => getTokenBalance(currentBot.vaultAddress, holding.id!, currentBot.network))
  // );

  // // combine holding token data with amounts
  // const currentHoldingsWithAmounts = vaultHoldings.map((item, index) => {
  //   return { ...item, amount: holdingsAmounts[index] };
  // });

  // const holdingsIsEqual = currentBot.IfHoldingIsEqual(currentHoldingsWithAmounts, rebalanceHoldingsWithAmout);

  // if (!holdingsIsEqual) {
  //   console.log('The holding values are not equal!');
  //   return;
  // }
  // const symbolsCurrent: string[] = [];
  // const symbolsRebalanced: string[] = [];

  // for (let holding of currentHoldingsWithAmounts) {
  //   symbolsCurrent.push(holding.symbol!);
  // }

  // for (let holding of rebalanceHoldingsWithAmout) {
  //   symbolsRebalanced.push(holding.symbol!);
  // }
  // let i = 0;

  // for (let holding of currentHoldingsWithAmounts) {
  //   if (symbolsRebalanced.includes(holding.symbol!)) {
  //     const rebalancedIndex = rebalanceHoldingsWithAmout.indexOf(holding);
  //     let difference = holding.amount.sub(rebalanceHoldingsWithAmout[rebalancedIndex].amount);
  //     if (difference.gt(0)) {
  //       currentBot.swapWithAmount(holding.symbol!, 'WETH', difference);
  //     }
  //   } else {
  //     currentBot.buyLimit(holding.symbol!, 'WETH', 0);
  //   }
  // }

  //this is where we change to the function we need
  const func2pass: string = 'rebalancePortfolio';
  //
  //
  const vaultHoldings = await getCurrentHoldings(currentBot);
  const holdingsLength = vaultHoldings.length;
  switch (func2pass) {
    case 'liquidate':
      //only liquidate the tokens in here
      const tokensToLiquidate: string[] = ['YFI', 'WETH'];

      console.log('It got past declaring vaultHoldings');
      const hardCodedAmount: BigNumber = BigNumber.from('0');

      for (let i = 0; i < holdingsLength; i++) {
        await console.log(`BEFORE LIQUIDATE This is within the for each loop index of ${i} `);
        //check the token we are swapping is not zero and is a token that should be liquidated
        if (!vaultHoldings[i].amount.isZero() || !tokensToLiquidate.includes(vaultHoldings[i].symbol!)) {
          await run(currentBot, func2pass, vaultHoldings[i]).then((res) => console.log("That's all folks."));
        } else {
          console.log('Amount was zero');
        }

        await console.log(`AFTER LIQUIDATE This is within the for each loop index of ${i} `);
      }
      await run(await EnzymeBot.create('KOVAN'), func2pass); //.then((res) => console.log("That's all folks."));
      break;
    case 'buyLimit':
      await run(await EnzymeBot.create('KOVAN'), func2pass);
      break;
    case 'sellLimit':
      await run(await EnzymeBot.create('KOVAN'), func2pass, 'BUSD', 'UNI');
      break;
    case 'addHolding':
      await run(await EnzymeBot.create('KOVAN'), func2pass);
      break;
    case 'swapWithAmount':
      await run(await EnzymeBot.create('KOVAN'), func2pass);
      break;

    case 'rebalancePortfolio':
      const rebalanceHoldingsWithAmout = await currentBot.CreatesRebalanceHoldings();
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
        if (holding.symbol != 'WETH') {
          //console.log(holding.symbol);
          //console.log(symbolsRebalanced);
          if (symbolsRebalanced.includes(holding.symbol!)) {
            //console.log(holding);
            const rebalancedIndex = symbolsRebalanced.indexOf(holding.symbol!);
            console.log('REBALANCED HOLDING WITH AMOUNT ---------- \n');
            console.log(rebalancedIndex);
            //console.log(rebalanceHoldingsWithAmout[rebalancedIndex]);
            let difference = holding.amount.sub(rebalanceHoldingsWithAmout[rebalancedIndex].amount);
            if (difference.gt(0)) {
              console.log('Swap With Amount');
              await run(currentBot, 'swapWithAmount', holding.symbol, 'WETH', difference);
              //currentBot.swapWithAmount(holding.symbol!, 'WETH', difference);
            }
          } else {
            console.log('Removed all holding: ' + holding.symbol);
            await run(currentBot, 'buyLimit', holding.symbol!, 'WETH', 0);
          }
        }
      }

      break;

    default:
      currentBot.getVaultValues();
  }

  // const vaultHoldings = await getCurrentHoldings(currentBot);
  // const holdingsLength = vaultHoldings.length;

  // //only liquidate the tokens in here
  // const tokensToLiquidate: string[] = ['MKR', 'UNI', 'WBTC'];

  // console.log('It got past declaring vaultHoldings');
  // const hardCodedAmount: BigNumber = BigNumber.from('0');

  // for (let i = 0; i < holdingsLength; i++) {
  //   await console.log(`BEFORE LIQUIDATE This is within the for each loop index of ${i} `);
  //   //check the token we are swapping is not zero and is a token that should be liquidated
  //   if (!vaultHoldings[i].amount.isZero() || !tokensToLiquidate.includes(vaultHoldings[i].symbol!)) {
  //     await run(currentBot, vaultHoldings[i]).then((res) => console.log("That's all folks."));
  //   } else {
  //     console.log('Amount was zero');
  //   }

  //   await console.log(`AFTER LIQUIDATE This is within the for each loop index of ${i} `);
  // }

  //console.log('STARTING IT UP');
})();
