import {
  callOnIntegrationArgs,
  ComptrollerLib,
  IntegrationManagerActionId,
  takeOrderSelector,
  uniswapV2TakeOrderArgs,
  VaultLib,
} from '@enzymefinance/protocol';
import { BigNumber, providers, utils, Wallet } from 'ethers';
import { getDeployment } from './utils/getDeployment';
import { getProvider } from './utils/getProvider';
import { getToken, getTokens } from './utils/getToken';
import { getTokenBalance } from './utils/getTokenBalance';
import { getVaultInfo } from './utils/getVault';
import { getWallet } from './utils/getWallet';
import { loadEnv } from './utils/loadEnv';
import { getPrice2 } from './utils/getPrice';
import { AssetsQuery, CurrentReleaseContractsQuery, VaultQuery } from './utils/subgraph/subgraph';
import { getTradeDetails, TokenBasics } from './utils/uniswap/getTradeDetails';

export class EnzymeBot {
  public static async create(network: 'KOVAN' | 'MAINNET') {
    const subgraphEndpoint =
      network === 'MAINNET' ? loadEnv('MAINNET_SUBGRAPH_ENDPOINT') : loadEnv('KOVAN_SUBGRAPH_ENDPOINT');
    const key = network === 'MAINNET' ? loadEnv('MAINNET_PRIVATE_KEY') : loadEnv('KOVAN_PRIVATE_KEY');
    const contracts = await getDeployment(subgraphEndpoint);
    const tokens = await getTokens(subgraphEndpoint);
    const provider = getProvider(network);
    const wallet = getWallet(key, provider);
    const vaultAddress = loadEnv('ENZYME_VAULT_ADDRESS');
    const vault = await getVaultInfo(subgraphEndpoint, vaultAddress);

    return new this(network, contracts, tokens, wallet, vaultAddress, vault, provider, subgraphEndpoint);
  }

  private constructor(
    public readonly network: 'KOVAN' | 'MAINNET',
    public readonly contracts: CurrentReleaseContractsQuery,
    public readonly tokens: AssetsQuery,
    public readonly wallet: Wallet,
    public readonly vaultAddress: string,
    public readonly vault: VaultQuery,
    public readonly provider: providers.JsonRpcProvider,
    public readonly subgraphEndpoint: string
  ) {}

  public async chooseRandomAsset() {
    const release = this.vault.fund?.release.id;

    //console.log(release);

    if (!release) {
      return undefined;
    }

    const assets = this.tokens.assets.filter((asset) => !asset.derivativeType);

    const releaseAssets = assets.filter((asset) =>
      asset.releases.map((innerRelease) => innerRelease.id).includes(release)
    );

    if (!releaseAssets || releaseAssets.length === 0) {
      return undefined;
    }

    const length = releaseAssets.length;
    const random = Math.floor(Math.random() * length);

    return releaseAssets[random];
  }

  public async getHoldings() {
    const vault = new VaultLib(this.vaultAddress, this.wallet);

    //const vaultAddy: string = '0xa731eef1d7687e0cf23fa7d83a7501a142b929fa';
    //const vault = new VaultLib(vaultAddy, this.wallet);

    const holdings = await vault.getTrackedAssets();
    return Promise.all(holdings.map((item: string) => getToken(this.subgraphEndpoint, 'id', item.toLowerCase())));
  }

  public async getPrice(buyToken: TokenBasics, sellToken: TokenBasics, sellTokenAmount: BigNumber) {
    const details = await getTradeDetails(this.network, sellToken, buyToken, sellTokenAmount);

    return details;
  }

  public async swapTokens(trade: {
    path: string[];
    minIncomingAssetAmount: BigNumber;
    outgoingAssetAmount: BigNumber;
  }) {
    const adapter = this.contracts.network?.currentRelease?.uniswapV2Adapter;
    const integrationManager = this.contracts.network?.currentRelease?.integrationManager;
    const comptroller = this.vault.fund?.accessor.id;

    if (!adapter || !integrationManager || !comptroller) {
      console.log(
        'Missing a contract address. Uniswap Adapter: ',
        adapter,
        ' Integration Manager: ',
        integrationManager
      );
      return;
    }

    const takeOrderArgs = uniswapV2TakeOrderArgs({
      path: trade.path,
      minIncomingAssetAmount: trade.minIncomingAssetAmount,
      outgoingAssetAmount: trade.outgoingAssetAmount,
    });

    const callArgs = callOnIntegrationArgs({
      adapter,
      selector: takeOrderSelector,
      encodedCallArgs: takeOrderArgs,
    });
    const contract = new ComptrollerLib(comptroller, this.wallet);
    return contract.callOnExtension.args(integrationManager, IntegrationManagerActionId.CallOnIntegration, callArgs);
  }

  public async getVaultValues() {
    //get holdings of vault
    const vaultHoldings = await this.getHoldings();

    // if you have no holdings, return
    if (vaultHoldings.length === 0) {
      console.log('Your fund has no assets.');
      return;
    }

    //makes an amount array of numbers from getToken
    const holdingsAmounts = await Promise.all(
      vaultHoldings.map((holding) => getTokenBalance(this.vaultAddress, holding!.id, this.network))
    );

    // combine holding token data with amounts
    const holdingsWithAmounts = vaultHoldings.map((item, index) => {
      return { ...item, amount: holdingsAmounts[index] };
    });

    //console.log(holdingsWithAmounts);

    let totalValue = 0;
    for (let holding of holdingsWithAmounts) {
      let decimals = holding.decimals;
      let DecimalAmount = parseInt(holding.amount._hex, 16);
      let amount = DecimalAmount / 10 ** decimals!;
      let priceOfCoin = await getPrice2(this.subgraphEndpoint, holding.symbol!);

      // console.log(holding.symbol);
      // console.log(amount);
      // console.log(priceOfCoin);

      let value = amount * priceOfCoin!;
      // console.log(value);
      totalValue += value;
    }
    //console.log(totalValue);
    return totalValue;
  }

  public async liquidate(vaultHolding: any) {
    let liquidTokenSymbol = 'WETH';

    // // if you have no holdings, return
    // if (vaultHoldings.length === 0) {
    //   console.log('Your fund has no assets.');
    //   return;
    // }

    //this will be the token we are liquidating everything into
    const liquidToken = this.tokens.assets.find(
      (asset) => !asset.derivativeType && asset.symbol === liquidTokenSymbol
    )!;

    const sellingToken = vaultHolding;

    //make sure you are not trying to swap the token with itself
    if (liquidToken.symbol === sellingToken.symbol) {
      return;
    }

    //console.log(sellingToken);

    const swapTokensInput = await this.getPrice(
      { id: liquidToken.id, decimals: liquidToken.decimals, symbol: liquidToken.symbol, name: liquidToken.name },
      {
        id: sellingToken.id as string,
        decimals: sellingToken.decimals as number,
        symbol: sellingToken.symbol as string,
        name: sellingToken.name as string,
      },
      sellingToken.amount
    );
    //console.log(swapTokensInput);
    if (swapTokensInput) {
      return this.swapTokens(swapTokensInput); //.then(() => console.log('Done Liquidating'));
    }
    //}
  }

  public async CreatesRebalanceHoldings() {
    let tokens: any[] = [];

    //simulates what we get from front end
    let token1 = { symbol: 'USDC', amount: 95992.717 };

    tokens.push(token1);

    let token2 = { symbol: 'UNI', amount: 166.82298136 };

    tokens.push(token2);

    let token3 = { symbol: 'WBTC', amount: 0.2071803 };

    tokens.push(token3);

    //let token4 = { symbol: 'MKR', amount: 0.5 };

    //tokens.push(token4);

    let rebalancedHoldings: any[] = [];

    let rebalancedAmounts: BigNumber[] = [];

    for (let token of tokens) {
      //make and push token object for each token string
      const currentToken = this.tokens.assets.find((asset) => !asset.derivativeType && asset.symbol === token.symbol)!;
      rebalancedHoldings.push(currentToken);

      // make and get token amount with decimals in BigNumber form
      //let decimals: BigNumber = BigNumber.from(currentToken.decimals);
      const Hexstring: string =
        '0x' + (Number(token.amount.toFixed(currentToken.decimals)) * 10 ** currentToken.decimals).toString(16);
      //console.log(Hexstring);
      let tokenAmount: BigNumber = BigNumber.from(Hexstring); //.mul(decimals);
      rebalancedAmounts.push(tokenAmount);
      //console.log(tokenAmount);
    }
    console.log(rebalancedAmounts);

    const RebalancedholdingsWithAmounts = rebalancedHoldings.map((item, index) => {
      return { ...item, amount: rebalancedAmounts[index] };
    });

    return RebalancedholdingsWithAmounts;

    // const vaultHoldings = await this.getHoldings();

    // const  currentVaultAmount= await Promise.all(
    //   vaultHoldings.map((holding) => getTokenBalance(this.vaultAddress, holding!.id, this.network))
    // );

    // // combine holding token data with amounts
    // const CurrentHoldingsWithAmounts = vaultHoldings.map((item, index) => {
    //   return { ...item, amount: currentVaultAmount[index] }});
    // //   console.log ('CurrentHoldings:');
    // //   console.log(CurrentHoldingsWithAmounts);

    // //   console.log ('Rebalanced Holdings:')
    // // console.log(RebalancedholdingsWithAmounts);

    // const holdingsIsEqual = this.IfHoldingIsEqual(CurrentHoldingsWithAmounts, RebalancedholdingsWithAmounts);

    // if(!holdingsIsEqual) {
    //   return;
    // }
    // const symbolsCurrent: string[] = [];
    // const symbolsRebalanced: string[] = [];

    // for (let holding of CurrentHoldingsWithAmounts ) {
    //   symbolsCurrent.push(holding.symbol!);
    // }

    // for (let holding of RebalancedholdingsWithAmounts) {
    //   symbolsRebalanced.push(holding.symbol!);
    // }
    // let i = 0;

    // for (let holding of CurrentHoldingsWithAmounts ){

    //   if (symbolsRebalanced.includes(holding.symbol!)){
    //    const rebalancedIndex = RebalancedholdingsWithAmounts.indexOf(holding);
    //    let difference = holding.amount.sub(RebalancedholdingsWithAmounts[rebalancedIndex].amount);
    //     if(difference.gt(0))
    //     {

    //     }
    //   }
    //   else
    //   {

    //   }
    // }
  }

  public async IfHoldingIsEqual(currentPortfolio: any[], rebalancedPortfolio: any[]) {
    let currentTotalValue = 0;
    for (let holding of currentPortfolio) {
      let decimals = holding.decimals;
      let DecimalAmount = parseInt(holding.amount._hex, 16);
      let amount = DecimalAmount / 10 ** decimals!;
      let priceOfCoin = await getPrice2(this.subgraphEndpoint, holding.symbol!);
      let value = amount * priceOfCoin!;
      currentTotalValue += value;
    }

    let rebalancedtotalValue = 0;
    for (let holding of rebalancedPortfolio) {
      let decimals = holding.decimals;
      let DecimalAmount = parseInt(holding.amount._hex, 16);
      let amount = DecimalAmount / 10 ** decimals!;
      let priceOfCoin = await getPrice2(this.subgraphEndpoint, holding.symbol!);
      let value = amount * priceOfCoin!;
      rebalancedtotalValue += value;
    }
    console.log(currentTotalValue);
    console.log('-----------------');
    console.log(rebalancedtotalValue);
    //let fivePercent = (rebalancedtotalValue * 0.05);

    // allows trades within 5%
    const withinFivePercent =
      rebalancedtotalValue > currentTotalValue * 0.95 && rebalancedtotalValue <= currentTotalValue;
    const value = currentTotalValue === rebalancedtotalValue || withinFivePercent;
    if (value === false) {
      console.log('\n The amounts are not equal or within 5 percent \n');
    }
    return value;
  }

  // use this function to add holdings
  public async addHolding() {
    let tokenPriceLimit = 0;

    let sellTokenSymbol = 'UNI';

    let buyTokenSymbol = 'WBTC';

    // gets the price of the wanted token
    let realTokenPrice = await getPrice2(this.subgraphEndpoint, buyTokenSymbol);

    //get holdings of vault
    const vaultHoldings2 = await this.getHoldings();

    // if you have no holdings, return
    if (vaultHoldings2.length === 0) {
      console.log('Your fund has no assets.');
      return;
    }

    // define the buy token
    const buyingToken = this.tokens.assets.find((asset) => !asset.derivativeType && asset.symbol === buyTokenSymbol)!;

    //makes an amount array of numbers from getToken
    const holdingsAmounts2 = await Promise.all(
      vaultHoldings2.map((holding) => getTokenBalance(this.vaultAddress, holding!.id, this.network))
    );

    // combine holding token data with amounts
    const holdingsWithAmounts2 = vaultHoldings2.map((item, index) => {
      return { ...item, amount: holdingsAmounts2[index] };
    });

    // find the token you will sell by searching for largest token holding
    const sellingToken = holdingsWithAmounts2.find(
      (asset) => !asset?.derivativeType && asset?.symbol === sellTokenSymbol
    )!;

    const hardCodedAmount: BigNumber = BigNumber.from('3'); // divide by 3 to swap

    // the first input token will be bought, the second will be sold
    // this will create the input needed for our swap
    const swapTokensInput = await this.getPrice(
      { id: buyingToken.id, decimals: buyingToken.decimals, symbol: buyingToken.symbol, name: buyingToken.name },
      {
        id: sellingToken.id as string,
        decimals: sellingToken.decimals as number,
        symbol: sellingToken.symbol as string,
        name: sellingToken.name as string,
      },
      sellingToken.amount.div(hardCodedAmount)
    );

    if (realTokenPrice && tokenPriceLimit < realTokenPrice) {
      return this.swapTokens(swapTokensInput);
    }
  }

  //Buy limit order function
  public async buyLimit(sellTokenSymbol: string, buyTokenSymbol: string, tokenPriceLimit: number) {
    // gets the price of the wanted token
    let realTokenPrice = await getPrice2(this.subgraphEndpoint, buyTokenSymbol);

    //get holdings of vault
    const vaultHoldings = await this.getHoldings();

    // if you have no holdings, return
    if (vaultHoldings.length === 0) {
      console.log('Your fund has no assets.');
      return;
    }

    // define the buy token
    const buyingToken = this.tokens.assets.find((asset) => !asset.derivativeType && asset.symbol === buyTokenSymbol)!;

    //makes an amount array of numbers from getToken
    const holdingsAmounts = await Promise.all(
      vaultHoldings.map((holding) => getTokenBalance(this.vaultAddress, holding!.id, this.network))
    );

    // combine holding token data with amounts
    const holdingsWithAmounts = vaultHoldings.map((item, index) => {
      return { ...item, amount: holdingsAmounts[index] };
    });

    // find the token you will sell by searching for largest token holding
    const sellingToken = holdingsWithAmounts.find(
      (asset) => !asset?.derivativeType && asset?.symbol === sellTokenSymbol
    )!;

    // the first input token will be bought, the second will be sold
    // this will create the input needed for our swap
    let bigNumberSample = BigNumber.from('50000000000000000');
    const swapTokensInput = await this.getPrice(
      { id: buyingToken.id, decimals: buyingToken.decimals, symbol: buyingToken.symbol, name: buyingToken.name },
      {
        id: sellingToken.id as string,
        decimals: sellingToken.decimals as number,
        symbol: sellingToken.symbol as string,
        name: sellingToken.name as string,
      },
      sellingToken.amount
      //bigNumberSample
    );

    if (realTokenPrice && tokenPriceLimit < realTokenPrice) {
      return this.swapTokens(swapTokensInput);
    }
  }
  //Sell limit order function
  public async sellLimit(sellTokenSymbol: string, buyTokenSymbol: string, tokenPriceLimit: number) {
    // this is getting the price of the sellToken
    let realTokenPrice = await getPrice2(this.subgraphEndpoint, sellTokenSymbol);

    //get holdings of vault
    const vaultHoldings = await this.getHoldings();

    // if you have no holdings, return
    if (vaultHoldings.length === 0) {
      console.log('Your fund has no assets.');
      return;
    }

    // define the buy token
    const buyingToken = this.tokens.assets.find((asset) => !asset.derivativeType && asset.symbol === buyTokenSymbol)!;

    //makes an amount array of numbers from getToken
    const holdingsAmounts = await Promise.all(
      vaultHoldings.map((holding) => getTokenBalance(this.vaultAddress, holding!.id, this.network))
    );

    // combine holding token data with amounts
    const holdingsWithAmounts = vaultHoldings.map((item, index) => {
      return { ...item, amount: holdingsAmounts[index] };
    });

    // find the token you will sell by searching for largest token holding
    const sellingToken = holdingsWithAmounts.find(
      (asset) => !asset?.derivativeType && asset?.symbol === sellTokenSymbol
    )!;

    // the first input token will be bought, the second will be sold
    // this will create the input needed for our swap
    const swapTokensInput = await this.getPrice(
      { id: buyingToken.id, decimals: buyingToken.decimals, symbol: buyingToken.symbol, name: buyingToken.name },
      {
        id: sellingToken.id as string,
        decimals: sellingToken.decimals as number,
        symbol: sellingToken.symbol as string,
        name: sellingToken.name as string,
      },
      sellingToken.amount
    );

    if (realTokenPrice && realTokenPrice > tokenPriceLimit) {
      return this.swapTokens(swapTokensInput);
    }
  }

  public async swapWithAmount(sellTokenSymbol: string, buyTokenSymbol: string, tokenAmount: BigNumber) {
    // gets the price of the wanted token
    let realTokenPrice = await getPrice2(this.subgraphEndpoint, buyTokenSymbol);

    //get holdings of vault
    const vaultHoldings = await this.getHoldings();

    // if you have no holdings, return
    if (vaultHoldings.length === 0) {
      console.log('Your fund has no assets.');
      return;
    }

    // define the buy token
    const buyingToken = this.tokens.assets.find((asset) => !asset.derivativeType && asset.symbol === buyTokenSymbol)!;
    console.log('Buying token \n ------------------------------');
    console.log(buyingToken);
    //makes an amount array of numbers from getToken
    const holdingsAmounts = await Promise.all(
      vaultHoldings.map((holding) => getTokenBalance(this.vaultAddress, holding!.id, this.network))
    );

    // combine holding token data with amounts
    const holdingsWithAmounts = vaultHoldings.map((item, index) => {
      return { ...item, amount: holdingsAmounts[index] };
    });

    // find the token you will sell by searching for largest token holding
    const sellingToken = holdingsWithAmounts.find(
      (asset) => !asset?.derivativeType && asset?.symbol === sellTokenSymbol
    )!;
    console.log('Selling Token \n ------------------------------');
    console.log(sellingToken);

    // the first input token will be bought, the second will be sold
    // this will create the input needed for our swap
    const swapTokensInput = await this.getPrice(
      { id: buyingToken.id, decimals: buyingToken.decimals, symbol: buyingToken.symbol, name: buyingToken.name },
      {
        id: sellingToken.id as string,
        decimals: sellingToken.decimals as number,
        symbol: sellingToken.symbol as string,
        name: sellingToken.name as string,
      },
      tokenAmount
    );
    console.log('Swap Tokens Input \n ------------------------------');
    console.log(swapTokensInput);
    return this.swapTokens(swapTokensInput);
  }
  // // get a random token
  // const randomToken = await this.chooseRandomAsset();

  // //console.log(randomToken);

  // // if no random token return, or if the random token is a derivative that's not available on Uniswap
  // if (!randomToken || randomToken.derivativeType) {
  //   console.log("The Miner's Delight did not find an appropriate token to buy.");
  //   return;
  // }

  // // get your fund's holdings
  // const vaultHoldings = await this.getHoldings();

  // // if you have no holdings, return
  // if (vaultHoldings.length === 0) {
  //   console.log('Your fund has no assets.');
  //   return;
  // }

  // // if your vault already holds the random token, return
  // if (vaultHoldings.map((holding) => holding?.id.toLowerCase()).includes(randomToken.id.toLowerCase())) {
  //   console.log("You already hold the asset that the Miner's Delight randomly selected.");
  //   return;
  // }

  // // get the amount of each holding
  // const holdingAmounts = await Promise.all(
  //   vaultHoldings.map((holding) => getTokenBalance(this.vaultAddress, holding!.id, this.network))
  // );

  // // combine holding token data with amounts
  // const holdingsWithAmounts = vaultHoldings.map((item, index) => {
  //   return { ...item, amount: holdingAmounts[index] };
  // });

  // // find the token you will sell by searching for largest token holding
  // const biggestPosition = holdingsWithAmounts.reduce((carry, current) => {
  //   if (current.amount.gte(carry.amount)) {
  //     return current;
  //   }
  //   return carry;
  // }, holdingsWithAmounts[0]);

  // console.log(
  //   `The Miner's Delight has chosen. You will trade ${utils.formatUnits(
  //     biggestPosition.amount,
  //     biggestPosition.decimals
  //   )} ${biggestPosition.name} (${biggestPosition.symbol}) for as many ${randomToken.name} (${
  //     randomToken.symbol
  //   }) as you can get.`
  // );

  // // get the trade data
  // const price = await this.getPrice(
  //   { id: randomToken.id, decimals: randomToken.decimals, symbol: randomToken.symbol, name: randomToken.name },
  //   {
  //     id: biggestPosition.id as string,
  //     decimals: biggestPosition.decimals as number,
  //     symbol: biggestPosition.symbol as string,
  //     name: biggestPosition.name as string,
  //   },
  //   biggestPosition.amount
  // );

  // // call the transaction
  // return this.swapTokens(price);
}
