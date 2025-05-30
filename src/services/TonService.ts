// 📄 src/services/TonService.ts
import { TonClient } from 'tonapi-sdk';

const tonClient = new TonClient({
  apiKey: process.env.NEXT_PUBLIC_TONAPI_KEY || '',
});

export async function fetchTonData(walletAddress: string) {
  try {
    const [wallet, jettons, nfts] = await Promise.all([
      tonClient.accounts.getInfo(walletAddress),
      tonClient.accounts.getJettons(walletAddress),
      tonClient.accounts.getNftItems(walletAddress),
    ]);

    return {
      tonBalance: wallet.balance.coins, // в нанотонах
      jettons: jettons.balances,
      nfts: nfts.nft_items,
    };
  } catch (error) {
    console.error('Ошибка получения данных TON:', error);
    return null;
  }
}
