// 📄 src/types/assetType.ts

export interface AssetType {
    token: string;           // Название токена (например, 'TON', 'USDT', 'DOMINUM')
    tokenLogo: string;       // Ссылка или путь к иконке токена
    tokenAddress: string[];  // Массив адресов токена в разных сетях (например, mainnet/testnet)
    decimals?: number;       // Количество знаков после запятой (например, 9 для TON, 6 для USDT)
    balance?: string;        // Баланс пользователя (в строке, чтобы не было потерь точности)
}
