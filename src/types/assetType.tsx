// 📄 src/types/assetType.ts

export interface AssetType {
  token: string;
  tokenLogo: string;
  tokenAddress: string[];
  decimals?: number;
  balance?: string;
}
