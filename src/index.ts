
import { EnzymeBot } from './EnzymeBot';
import { getGasPrice } from './utils/getGasPrice';
import { getRevertError } from './utils/getRevertError';

let i = 0;
let vaultHoldings;


// a function to return the length of the vault Holdings and then begin the run bot.
async function holding(bot: EnzymeBot) {
  // get the array for the holdings, but we only need the length.
  const vaultHoldings = await bot.getHoldings();
  
  // pass on the length of the array to the run function
  await run(await EnzymeBot.create('KOVAN'), vaultHoldings.length).then((res) => console.log("That's all folks."));
  return Promise.resolve(true);
}



//const vaultHoldings = start(await EnzymeBot.create('KOVAN'));

async function run(bot: EnzymeBot, vlength: number) {

  try {
    // return the transaction object


    const tx = await bot.liquidate(vlength);

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
    // vlength - 2 was done to prevent bot from running into undefined error ( function was reading outside the array )
   /*
    while (i <= (vlength - 2)) {
      i++;
      await run(bot, vlength).then((res) => console.log(`Liquidated ${i} Tokens`));
    }*/

    // }, 1000 * 60);
  }

  return Promise.resolve(true);
}


(async function main() {
  console.log('STARTING IT UP');

  // will start bot through holding. allows us to pass the length of the array in one go.
  // was done using callback to the run function.
  holding(await EnzymeBot.create('KOVAN'))
  

})();

