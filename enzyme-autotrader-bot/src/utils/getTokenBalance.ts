import { StandardToken } from '@enzymefinance/protocol';
import { getProvider } from './getProvider';
import { providers } from 'ethers';

export async function getTokenBalance(vaultContract: string, token: string, network: 'KOVAN' | 'MAINNET') {
  //const provider = getProvider(network);
  const node = 'https://kovan.infura.io/v3/1e622323c17e434b937c3433a0e6da56';
  const provider = new providers.JsonRpcProvider(node, network.toLowerCase());
  const contract = new StandardToken(token, provider);
  return contract.balanceOf.args(vaultContract).call();
}
