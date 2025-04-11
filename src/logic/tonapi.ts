import axios from "axios";

// interfaces
export interface GetAllJettonsBalancesDto {
  balances: JettonBalance[];
}

interface JettonBalance {
  balance: string,
  jetton: undefined | {
      address: string,
      decimals: number,
      image: undefined | string,
      name: string,
      symbol: string,
      verification: any
  },
  verification: any,
  wallet_address: AccountSmall
}

export interface AccountSmall {
  address: string,
  icon: undefined | string,
  is_scam: boolean,
  name: undefined | string,
}

export interface GetHumanFriendlyInfoDto {
  address: string;
  balance: number;
  last_activity: number;
  status: string;
  interfaces?: string[][];
  name?: string;
  is_scam?: boolean;
  icon?: string;
  memo_required?: boolean;
  get_methods: string[];
  is_suspended?: boolean;
  is_wallet: boolean;
}


export class TonApi {
  private _url = "https://tonapi.io/v2/";

  public async send(url: string, data: any): Promise<any | undefined> {
    const res = await axios.get(`${this._url}${url}?${new URLSearchParams(data)}`);
    if (res.data.error) {
        console.error(res.data)
        return undefined
    }
    return res.data
  }

  public async getHumanFriendlyInfoDto(account_id: string): Promise<GetHumanFriendlyInfoDto | undefined> {
    const data = await this.send(`accounts/${account_id}`, {})
    return data
  }

  public async getAllJettonsBalances(account_id: string, currencies?: string): Promise<GetAllJettonsBalancesDto | undefined> {
    const data: { currencies?: string } = {}

    if(currencies !== undefined) {
      data.currencies = currencies
    }

    const result = await this.send(`accounts/${account_id}/jettons`, data)

    return result
  }
}
