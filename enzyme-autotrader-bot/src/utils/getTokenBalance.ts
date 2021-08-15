import { StandardToken } from '@enzymefinance/protocol';
import { getProvider } from './getProvider';
import { providers } from 'ethers';

export async function getTokenBalance(vaultContract: string, token: string, network: 'KOVAN' | 'MAINNET') {
  //const provider = getProvider(network);
  let provider;
  if (network === 'MAINNET') {
    const node = 'https://mainnet.infura.io/v3/1d5ebf5899694a72a55198c3719c06e5';
    provider = new providers.JsonRpcProvider(node, network.toLowerCase());
  } else {
    const node = 'https://kovan.infura.io/v3/1e622323c17e434b937c3433a0e6da56';
    provider = new providers.JsonRpcProvider(node, network.toLowerCase());
  }
  const contract = new StandardToken(token, provider);
  return contract.balanceOf.args(vaultContract).call();
}
