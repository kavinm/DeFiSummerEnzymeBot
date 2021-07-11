import { CurveLiquidityAaveAdapter } from '@enzymefinance/protocol';
import { EnzymeBot } from './EnzymeBot';
import { getGasPrice } from './utils/getGasPrice';
import { getRevertError } from './utils/getRevertError';
import { getTokenBalance } from './utils/getTokenBalance';

let i = 0;

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

  console.log(holdingsWithAmounts);
  console.log('Above is the current vault holdings and the bottom is length holdings');
  //console.log(lengthHoldings);

  return holdingsWithAmounts;
}

async function run(bot: EnzymeBot, vaultHoldings?: any[]) {
  // const vaultHoldings = await bot.getHoldings();
  // const lengthHoldings = vaultHoldings.length;
  // console.log(vaultHoldings);
  // console.log('Above is the current vault holdings and the bottom is length holdings');
  // console.log(lengthHoldings);
  //const lengthHoldings = vaultHoldings?.length;
  console.log(vaultHoldings);
  vaultHoldings?.forEach((holding, index) => {
    bot.liquidate(index, holding);
  });
  try {
    // return the transaction object

    const tx = await bot.buyLimit();

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
    setTimeout(() => {
      while (i < (vaultHoldings?.length || 0)) {
        i++;
        run(bot);
        console.log(`Liquidating the ${i}th Token`);
      }
    });
  }

  return Promise.resolve(true);
}

(async function main() {
  console.log('STARTING IT UP');
  const currentBot = await EnzymeBot.create('KOVAN');
  const vaultHoldings = await getCurrentHoldings(currentBot);
  run(currentBot, vaultHoldings).then((res) => console.log("That's all folks."));
})();
