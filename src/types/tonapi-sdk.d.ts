declare module 'tonapi-sdk' {
  import { AxiosInstance } from 'axios';

  interface TonJetton {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    image?: string;
  }

  interface JettonBalance {
    balance: string;
    jetton: TonJetton;
  }

  interface NftItem {
    address: string;
    name: string;
    previews: { url: string }[];
    collection: { name: string };
  }

  interface TonAccountInfo {
    balance: { coins: string };
  }

  export class TonClient {
    constructor(options: { apiKey: string });
    accounts: {
      getInfo(address: string): Promise<TonAccountInfo>;
      getJettons(address: string): Promise<{ balances: JettonBalance[] }>;
      getNftItems(address: string): Promise<{ nft_items: NftItem[] }>;
    };
  }
}
