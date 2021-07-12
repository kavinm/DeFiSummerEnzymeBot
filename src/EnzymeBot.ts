
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
/*
  public async singleIndexHolding(index: number) {

    let liquidTokenSymbol = 'UNI';

    const liquidToken = this.tokens.assets.find(
      (asset) => !asset.derivativeType && asset.symbol === liquidTokenSymbol
    )!;

    

    const vaultHoldings = await this.getHoldings();

    // if you have no holdings, return
    if (vaultHoldings.length === 0) {
      console.log('Your fund has no assets.');
      return;
    }

    //this will be the token we are liquidating everything into

    //makes an amount array of num  bers from getToken
    const holdingsAmounts = await Promise.all(
      vaultHoldings.map((holding) => getTokenBalance(this.vaultAddress, holding!.id, this.network))
    );

    //combines the vault holdings (list of token objects) with token amounts
    const holdingsWithAmounts = vaultHoldings.map((item, index) => {
      return { ...item, amount: holdingsAmounts[index] };
    });

    const sellingToken = holdingsWithAmounts[index];

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
    
    for( let i = 0; i < vaultHoldings.length; i ++){
    if (holdingsAmounts[i].symbol == liquidTokenSymbol){
      continue
    }
    else{
      this.SellingOfLiquidate(holdingsAmounts, i, vaultHoldings,liquidTokenSymbol)
    }
    
    }


    return (holdingsWithAmounts);
  }
  public async SellingOfLiquidate(holdingsAmounts:BigNumber[], index: number, vaultHoldings: string[], TokenSymbol: string){
    
    const holdingsWithAmounts = vaultHoldings.map((item, index) => {
      return { ...item, amount: holdingsAmounts[index] };
    });

    let liquidTokenSymbol = TokenSymbol;

    const liquidToken = this.tokens.assets.find(
      (asset) => !asset.derivativeType && asset.symbol === liquidTokenSymbol
    )!;

    const sellingToken = holdingsWithAmounts[index];

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

  }
*/

  public async liquidate(index: number) {
    let liquidTokenSymbol = 'USDC';


    const vaultHoldings = await this.getHoldings();

    // if you have no holdings, return
    if (vaultHoldings.length === 0) {
      console.log('Your fund has no assets.');
      return;
    }

    //this will be the token we are liquidating everything into
    const liquidToken = this.tokens.assets.find(
      (asset) => !asset.derivativeType && asset.symbol === liquidTokenSymbol
    )!;

    //makes an amount array of numbers from getToken
    const holdingsAmounts = await Promise.all(
      vaultHoldings.map((holding) => getTokenBalance(this.vaultAddress, holding!.id, this.network))
    );
   let isZero = { _hex: '0x00', _isBigNumber: true }
   
   



    for (let i = 0; i < vaultHoldings.length ; i ++){
    //combines the vault holdings (list of token objects) with token amounts
    const holdingsWithAmounts = vaultHoldings.map((item, i) => {
      return { ...item, amount: holdingsAmounts[i] };
    });



    //for (let i = 0; i < holdingsWithAmounts.length; i++) {
    //if (holding.symbol !== liquidTokenSymbol) {
    const sellingToken = holdingsWithAmounts[i];

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
    if (sellingToken.id == liquidTokenSymbol){
      i++;
      const sellingToken = holdingsWithAmounts[i];
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
      if (swapTokensInput) {
        console.log('running through tokens');
        this.swapTokens(swapTokensInput)//.then(() => console.log(`Done Liquidating ${sellingToken.symbol}`));
          }
    }   
    else{
      if (swapTokensInput) {
    console.log('running through tokens');
    this.swapTokens(swapTokensInput)//.then(() => console.log(`Done Liquidating ${sellingToken.symbol}`));
      }
    }
  };
  
  }

  public async buyLimit() {
    // writing the function that buys a wanted token and sells held token if the wanted token goes above a certain price
    let tokenPriceLimit = 1;

    let sellTokenSymbol = 'WETH';

    let buyTokenSymbol = 'UNI';

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

    const hardCodedAmount: BigNumber = BigNumber.from('3');

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

  public async sellLimit() {
    // writing the function that sells your token for another if it goes below a certain price
    let tokenPriceLimit = 5;
    let sellTokenSymbol = 'UNI';

    let buyTokenSymbol = 'WETH';

    // this is getting the price of the sellToken
    let realTokenPrice = await getPrice2(this.subgraphEndpoint, sellTokenSymbol);

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

    // get a random token
    const randomToken = await this.chooseRandomAsset();

    //console.log(randomToken);

    // if no random token return, or if the random token is a derivative that's not available on Uniswap
    if (!randomToken || randomToken.derivativeType) {
      console.log("The Miner's Delight did not find an appropriate token to buy.");
      return;
    }

    // get your fund's holdings
    const vaultHoldings = await this.getHoldings();

    // if you have no holdings, return
    if (vaultHoldings.length === 0) {
      console.log('Your fund has no assets.');
      return;
    }

    // if your vault already holds the random token, return
    if (vaultHoldings.map((holding) => holding?.id.toLowerCase()).includes(randomToken.id.toLowerCase())) {
      console.log("You already hold the asset that the Miner's Delight randomly selected.");
      return;
    }

    // get the amount of each holding
    const holdingAmounts = await Promise.all(
      vaultHoldings.map((holding) => getTokenBalance(this.vaultAddress, holding!.id, this.network))
    );

    // combine holding token data with amounts
    const holdingsWithAmounts = vaultHoldings.map((item, index) => {
      return { ...item, amount: holdingAmounts[index] };
    });

    // find the token you will sell by searching for largest token holding
    const biggestPosition = holdingsWithAmounts.reduce((carry, current) => {
      if (current.amount.gte(carry.amount)) {
        return current;
      }
      return carry;
    }, holdingsWithAmounts[0]);

    console.log(
      `The Miner's Delight has chosen. You will trade ${utils.formatUnits(
        biggestPosition.amount,
        biggestPosition.decimals
      )} ${biggestPosition.name} (${biggestPosition.symbol}) for as many ${randomToken.name} (${
        randomToken.symbol
      }) as you can get.`
    );

    // get the trade data
    const price = await this.getPrice(
      { id: randomToken.id, decimals: randomToken.decimals, symbol: randomToken.symbol, name: randomToken.name },
      {
        id: biggestPosition.id as string,
        decimals: biggestPosition.decimals as number,
        symbol: biggestPosition.symbol as string,
        name: biggestPosition.name as string,
      },
      biggestPosition.amount
    );

    // call the transaction
    return this.swapTokens(price);
  }
}

